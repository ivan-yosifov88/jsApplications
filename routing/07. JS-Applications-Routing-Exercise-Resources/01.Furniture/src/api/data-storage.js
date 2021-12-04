

export let token;
export let ownerId

export function setUserSession(data) {
    token = data.accessToken
    ownerId = data._id
    const userData = {
        'email': data.email,
        'ownerId': data._id,
        'token': data.accessToken
    }
    sessionStorage.setItem('userData', JSON.stringify(userData))
};

export function isValidSession(){
    return sessionStorage.getItem('userData') != null
}

export function clearUserSession() {
    sessionStorage.removeItem('userData')
    token = undefined
    ownerId = undefined
}