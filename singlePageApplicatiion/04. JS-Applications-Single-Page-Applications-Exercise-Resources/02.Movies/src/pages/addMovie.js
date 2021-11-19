import { makeRequest } from "../helpers.js";
import home from "./home.js";

let createMovieUrl = 'http://localhost:3030/data/movies';

let section = undefined;
let main = undefined;

function initialize(domElement, container) {
    section = domElement;
    section.addEventListener('submit', addNewMovie)
    main = container
    section.remove()
}

function loadView() {
    main.replaceChildren(section)
}
async function addNewMovie(event) {
    event.preventDefault()
    let form = new FormData(event.target);
    let _ownerId = localStorage.getItem('id');
    let title = form.get('title').trim();
    let description = form.get('description').trim();
    let img = form.get('imageUrl').trim();
    let body = {
        _ownerId,
        title,
        description,
        img
    }
    if (Object.values(body).some(record => record == '')) {
        alert('Please fill all fields')
        return
    }

    try {
        await makeRequest(createMovieUrl, "POST", body, true)
        event.target.reset()
    } catch (error) {

    }
    home.loadView()
}
let addMovie = {
    initialize,
    loadView
}
export default addMovie