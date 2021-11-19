import { createMovie } from "../dataManage/createMovie.js";
import { makeRequest } from "../helpers.js";
import userData from "../userData.js";
import addMovie from "./addMovie.js";

const moviesUrl = 'http://localhost:3030/data/movies'
let section = undefined;
let main = undefined;
let addButton = undefined
let movieSection = undefined

function initialize(domElement, container){
    section = domElement;
    addButton = section.querySelector('.user-view')
    movieSection = section.querySelector('.all-movies')
    addButton.addEventListener('click', loadAddMovieView)
    main = container 
    section.remove()
}

async function loadView(){
    if (userData.isUserLogged()){
        addButton.style.display = 'block';
    }else{
        addButton.style.display = 'none';
    }
    let data =  await showMovies()
    movieSection.replaceChildren(...data.map(createMovie))
    main.replaceChildren(section)
}
function loadAddMovieView(){
    addMovie.loadView()
}
async function showMovies(){
    try{
        let response = await makeRequest(moviesUrl, "GET", '', false)
        return response
    }catch(error){
        alert(error.message)
    }
}
let home = {
    initialize, 
    loadView
}
export default home