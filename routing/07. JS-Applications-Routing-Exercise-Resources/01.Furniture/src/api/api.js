import { clearUserSession, isValidSession, setUserSession, token } from './data-storage.js';

const host = 'http://localhost:3030'

async function makeRequest(url, options) {
    try {
        let request = await fetch(host + url, options);
        if (request.ok == false) {
            if (request.status == 403) {
                clearUserSession();
            }
            const error = await request.json();
            throw new Error(error.message)
        }
        if (request.status == 204) {
            return request
        }
        return await request.json()
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
        options.headers["X-Authorization"] = token;
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
    setUserSession(response)
};

export async function login(email, password) {
    let response = await postRequest("/users/login", {email, password});
    setUserSession(response)
};

export async function logout() {
    await getRequest("/users/logout")
    clearUserSession()
};

