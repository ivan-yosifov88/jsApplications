

export function setUserSession(data) {
    
    sessionStorage.setItem('userData', JSON.stringify(data))
};

export function isValidSession(){
    return sessionStorage.getItem('userData') != null
}

export function clearUserSession() {
    sessionStorage.removeItem('userData');
}

export function getUserData() {
    return sessionStorage.getItem('userData')
}
