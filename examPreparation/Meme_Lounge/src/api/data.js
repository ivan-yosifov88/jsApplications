import * as api from "./api.js";



export const register = api.register
export const login = api.login;
export const logout = api.logout;

export async function getAllMemes(){
    return api.getRequest('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(data) {
    return api.postRequest('/data/memes', data);
}

export async function getMemeById(id) {
    return api.getRequest('/data/memes/' + id)
}

export async function deleteMemeById(id) {
    return api.deleteRequest('/data/memes/' + id)
}

export async function updateMemeById(id, data) {
    return api.putRequest('/data/memes/' + id, data)
}

export async function getUserMemes(userId) {
    return api.getRequest(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}