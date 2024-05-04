const getCookie = cookieName => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

export function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const decodeToken = urlEncodedString => {
    let decodedUriComponent = decodeURIComponent(urlEncodedString.replace(/\+/g, ' ').replace(' path', ''));
    return JSON.parse(decodedUriComponent).accessToken;
}

export const getDecodedJwt = () => {
    const jwtCookie = getCookie("jwt");
    if(jwtCookie === undefined || "" === jwtCookie) {
        console.log("Could not get jwt cookie. Please log in and try again.")
        return ""
    }
    return decodeToken(jwtCookie);
}

export const urlParamValue = param => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(param);
}