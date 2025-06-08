export const emailRegex = new RegExp(
    '^[_a-zA-Z0-9-]+(\\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\\.([a-zA-Z]{2,})$'
);
export const passwordRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s])(?!.*\\s).{5,60}$'
);
export const forenameSurnameRegex = new RegExp(
    '^[A-Za-z]{2,}$'
);

export const getInactivityTimeout = () => {
    return 10 * 60 * 1000;
};

export const setCookie = (cookieName, value, expires) => {
    document.cookie = `${cookieName}=${value}; expires=${expires}; path=/;`
};

export const getCookie = cookieName => {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
};

export const removeCookie = cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
};

export const formatCurrency = (value) => {
    if (!value) return '';
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
};

export const formatHHMM = date => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
}

export const urlParamValue = param => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}

export const formatPrice = (price, keepDot) => {
    let formattedPrice = price.toFixed(2);
    if (!keepDot) {
        formattedPrice = formattedPrice.replace('.', ',');
    }
    return formattedPrice;
};

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, replacer);
}

const replacer = c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
}