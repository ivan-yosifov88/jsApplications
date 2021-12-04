import * as api from "./api.js";



export const register = api.register
export const login = api.login;
export const logout = api.logout;

export async function getAllGames(){
    return api.getRequest('/data/games?sortBy=_createdOn%20desc');
}

export async function getLatestGames() {
    return api.getRequest('/data/games?sortBy=_createdOn%20desc&distinct=category')
}

export async function createGame(data) {
    return api.postRequest('/data/games', data);
}

export async function getGameById(id) {
    return api.getRequest('/data/games/' + id)
}

export async function deleteGameById(id) {
    return api.deleteRequest('/data/games/' + id)
}

export async function updateGameById(id, data) {
    return api.putRequest('/data/games/' + id, data)
}
