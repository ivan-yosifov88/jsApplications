import * as api from "./api.js";



export const register = api.register
export const login = api.login;
export const logout = api.logout;

export async function createFurniture(data){          
    return api.postRequest('/data/catalog', data);
};

export async function getAllFurniture() {
    return api.getRequest('/data/catalog');
};

export async function getFurnitureDetails(id) {
    return api.getRequest('/data/catalog/' + id);
};

export async function updateFurnitureList(id, data) {
    return api.putRequest('/data/catalog/' + id, data);
};

export async function deleteFurnitureById(id) {
    return api.deleteRequest('/data/catalog/' + id);
};

export async function getMyFurniture(userId){
    return api.getRequest(`/data/catalog?where=_ownerId%3D%22${userId}%22`)
};
