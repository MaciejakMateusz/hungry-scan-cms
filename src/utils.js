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