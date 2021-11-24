const host = 'http://localhost:3030/jsonstore/collections'

async function makeRequest(url, method="GET", data) {
    const options = {
        method,
        headers: {}
    }
    if (data != undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data)
    }
    let response = await fetch (host + url, options)
    if (response.ok == false){
        throw new Error(error.message)
    }
    return response.json()
}

export async function getAllBooks(){
    return makeRequest('/books')
}

export async function getBookById(id){
    return makeRequest('/books/'+ id) 
}

export async function editBook(id, data){
    return makeRequest('/books/'+ id, "put", data) 
}

export async function deleteBook(id){
    return makeRequest('/books/'+ id, "DELETE")
}

export async function createBook(data){
    return makeRequest('/books', "POST", data)
}
