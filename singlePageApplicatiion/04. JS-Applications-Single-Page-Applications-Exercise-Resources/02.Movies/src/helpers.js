import userData from "./userData.js"

export async function makeRequest(url, method, body, isAuthorizedRequest) {
    // let headers = new Headers()
    let headers = {};
    let options = {
        method,
        headers

    }
    if (isAuthorizedRequest) {
        // headers.append("X-Authorization", localStorage.getItem('token'))
        headers["X-Authorization"] = localStorage.getItem('token')
    }
    if (method == "POST" || method == "PUT") {
        // headers.append("Content-type", "application/json")
        headers["Content-type"] = "application/json"
        options['body'] = JSON.stringify(body)
    }

    try{
        let request = await fetch(url, options)
    if (request.status == 204) {
        return "Logout or Delete"
    }
    if (request.ok == false){
        let error = await request.text()
        throw new Error(`${request.status} ${request.statusText}`)
    }
    let response = await request.json()
    return response
    }catch(error){
        alert(error.message)
    }
    // let request = await fetch(url, options)
    // if (request.status == 204) {
    //     return "Logout or Delete"
    // }
    // if (request.ok == false){
    //     throw new Error()
    // }
    // let response = await request.json()
    // return response
}

export function createElement(type, attributes, ...content) {
    let newElement = document.createElement(type);

    for (let property in attributes) {
        newElement.setAttribute(property, attributes[property])
    }

    for (let item of content) {
        if (typeof item == 'string' || typeof item == "number") {
            item = document.createTextNode(item)
        }
        newElement.appendChild(item)
    }
    return newElement
}

