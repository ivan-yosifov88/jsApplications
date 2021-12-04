import { clearUserSession, getUserData, isValidSession, setUserSession} from './data-storage.js';

const host = 'http://localhost:3030'

async function makeRequest(url, options) {
    try {
        let response = await fetch(host + url, options);
        if (response.ok == false) {
            if (response.status == 403) {
                clearUserSession();
            }
            const error = await response.json();
            throw new Error(error.message)
        }
        if (response.status == 204) {
            return response
        }
        return await response.json()
    } catch (error) {
        alert(error.message)
        throw error
    }
};

function createOptions(method = "GET", data) {
    const options = {
        method,
        headers : {}
    };
    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    };
    if (isValidSession()) {
        const user = JSON.parse(getUserData())
        options.headers["X-Authorization"] = user.token;
    }
    return options;
};

export async function getRequest(url){
    return makeRequest(url, createOptions());
};

export async function postRequest(url, data){
    return makeRequest(url, createOptions("POST", data));
};

export async function putRequest(url, data){
    return makeRequest(url, createOptions("PUT", data));
};

export async function deleteRequest(url){
    return makeRequest(url, createOptions("DELETE"));
};

export async function register(email, password) {
    let response = await postRequest("/users/register", {email, password});
    const userData = {
        email: response.email,
        id : response._id,
        token: response.accessToken
    }
    setUserSession(userData)
};

export async function login(email, password) {
    let response = await postRequest("/users/login", {email, password});
    const userData = {
        email: response.email,
        id : response._id,
        token: response.accessToken
    }
    setUserSession(userData)
};

export async function logout() {
    await getRequest("/users/logout")
    clearUserSession()
};

