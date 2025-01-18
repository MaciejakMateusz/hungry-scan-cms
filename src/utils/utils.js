export const emailRegex = new RegExp(
    '^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.([a-zA-Z]{2,})$'
);
export const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s])(?!.*\\s).{5,60}$'
);
export const forenameSurnameRegex = new RegExp(
    '^[A-Za-z]{2,}$'
);

export const getInactivityTimeout = () =>{
    return 10 * 60 * 1000;
}

export const getCookie = cookieName => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export const removeCookie = cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const formatCurrency = (value) => {
    if (!value) return '';
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

export const urlParamValue = param => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export const formatPrice = (price, keepDot) => {
    let formattedPrice = price.toFixed(2);
    if(!keepDot) {
        formattedPrice = formattedPrice.replace('.', ',');
    }
    return formattedPrice;
}