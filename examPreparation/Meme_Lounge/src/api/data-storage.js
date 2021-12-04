export let userData = {
    email : undefined,
    _ownerId : undefined,
    token : undefined,
    gender: undefined,
    username: undefined
}

export function setUserSession(data) {
    userData.email = data.email;
    userData._ownerId = data._id;
    userData.token = data.accessToken;
    userData.gender = data.gender;
    userData.username = data.username
    
    sessionStorage.setItem('userData', JSON.stringify(userData))
};

export function isValidSession(){
    return sessionStorage.getItem('userData') != null
}

export function clearUserSession() {
    sessionStorage.removeItem('userData');
    userData = {}
}