import * as api from "./api.js";



export const register = api.register
export const login = api.login;
export const logout = api.logout;

export async function getAllBooks(){
    return api.getRequest('/data/books?sortBy=_createdOn%20desc');
}

export async function createBook(data) {
    return api.postRequest('/data/books', data);
}

export async function getBookById(id) {
    return api.getRequest('/data/books/' + id)
}

export async function deleteBookById(id) {
    return api.deleteRequest('/data/books/' + id)
}

export async function updateBookById(id, data) {
    return api.putRequest('/data/books/' + id, data)
}

export async function getUserBooks(userId) {
    return api.getRequest(`/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}