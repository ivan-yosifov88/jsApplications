import { makeRequest } from "../helpers.js";
import home from "./home.js";


let baseUrl = 'http://localhost:3030/data/movies'
let section = undefined;
let main = undefined;
let movieId = undefined

function initialize(domElement, container){
    section = domElement;
    main = container 
    section.remove()
}

async function loadView(id){
    movieId = id
    section.addEventListener('submit', editMovieContent)
    main.replaceChildren(section)
}

async function editMovieContent(event){
    event.preventDefault()
    let url = `${baseUrl}/${movieId}`
    let form = new FormData(event.target);
    let title = form.get('title').trim();
    let description = form.get('description').trim();
    let img = form.get('imageUrl').trim();
    let body = {
        title,
        description,
        img
    }
    if (Object.values(body).some(record => record == '')) {
        alert('Please fill all fields')
        return
    }

    try {
        await makeRequest(url, "PUT", body, true)
        event.target.reset()
    } catch (error) {

    }
    home.loadView()
}
let editMovie = {
    initialize, 
    loadView
}
export default editMovie