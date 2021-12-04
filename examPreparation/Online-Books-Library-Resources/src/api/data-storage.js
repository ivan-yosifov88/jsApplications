export let userData = {
    email : undefined,
    token : undefined,
    _ownerId : undefined

}

export function setUserSession(data) {
    userData.email = data.email;
    userData.token = data.accessToken;
    userData._ownerId = data._id;
    
    sessionStorage.setItem('userData', JSON.stringify(userData))
};

export function isValidSession(){
    return sessionStorage.getItem('userData') != null
}

export function clearUserSession() {
    sessionStorage.removeItem('userData');
    userData = {}
}

export function getUserData() {
    return sessionStorage.getItem('userData')
}
