import * as api from "./api.js";



export const register = api.register
export const login = api.login;
export const logout = api.logout;


// TODO fill URl, rename methods and add new if I need to!
// check api.js if any new data that must be stored in session Storage

export async function getAllAlbums(){
    return api.getRequest('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function createAlbum(data) {
    return api.postRequest('/data/albums', data);
}

export async function getAlbumById(id) {
    return api.getRequest('/data/albums/' + id)
}

export async function deleteAlbumById(id) {
    return api.deleteRequest('/data/albums/' + id)
}

export async function updateAlbumById(id, data) {
    return api.putRequest('/data/albums/' + id, data)
}

export async function getSearchedAlbum(query) {
    return api.getRequest(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}
