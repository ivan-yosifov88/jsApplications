function createElement(type, attributes, ...content){
    let newElement = document.createElement(type);

    for (let property in attributes){
        newElement.setAttribute(property, attributes[property])
    }

    for (let item of content){
        if (typeof item == 'string' || typeof item == "number"){
            item = document.createTextNode(item)
        }
        newElement.appendChild(item)
    }
    return newElement
}   

function clearHtmlElementContent(htmlElement){
    htmlElement.forEach(element => element.remove())
}

async function makeRequest(url, options){
    try{
        let request =  await fetch(url, options);
        if (request.ok == false){
            let error = await request
            throw new Error(error)
        }
        let response = await request.json()
        return response
    }catch(error){
        alert(error.message)
    }
}

let helperFunctions = {
    createElement,
    clearHtmlElementContent,
    makeRequest
}

export default helperFunctions