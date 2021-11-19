import { createElement, makeRequest } from "../helpers.js";
import editMovie from "../pages/editMovie.js";
import home from "../pages/home.js";
import description from "../pages/movieDescription.js";
import userData from "../userData.js";


const baseUrl = 'http://localhost:3030/data/movies';
const likesUrl = 'http://localhost:3030/data/likes';
let unlikeUrl = 'http://localhost:3030/data/likes';
let deleteButton = undefined
let editButton = undefined
let likeButton = undefined
let spanLikes = undefined
let userId = undefined
let isUserCanLike = undefined

export function createMovieDetails(data, likes, canUserLike) {
    userId = data._ownerId
    isUserCanLike = canUserLike
    let newDetails = createElement('div', { class: "row bg-light text-dark" },
        createElement('h1', {}, `Movie title: ${data.title}`),
        createElement('div', { class: "col-md-8" },
            createElement('img', { class: "img-thumbnail", src: data.img, alt: "Movie" }
            ),
        ),
        createElement('div', { class: "col-md-4 text-center" },
            createElement('h3', { class: "my-3 " }, "Movie Description"),
            createElement('p', {}, data.description),
            createElement('a', { class: "btn btn-danger", href: "#", "data-id": data._id}, "Delete"),
            createElement('a', { class: "btn btn-warning", href: "#","data-id": data._id}, "Edit"),
            createElement('a', { class: "btn btn-primary", href: "#", "data-id": data._id}, "Like"),
            createElement('span', { class: "enrolled-span" }, `Liked${likes}`)
        )
    )
    deleteButton = newDetails.querySelector('.btn.btn-danger');
    deleteButton.addEventListener('click', deleteMovie)
    editButton = newDetails.querySelector('.btn.btn-warning')
    editButton.addEventListener('click', loadEditPage)
    likeButton = newDetails.querySelector('.btn.btn-primary')
    likeButton.addEventListener('click', movieVote)
    spanLikes = newDetails.querySelector('.enrolled-span')
   
    if (localStorage.getItem('id') == userId) {
        deleteButton.style.display = 'inline' 
        editButton.style.display = 'inline' 
        likeButton.style.display = 'none'
        spanLikes.style.display = 'inline' 
    } else {
        deleteButton.style.display = 'none' 
        editButton.style.display = 'none' 
        likeButton.style.display = 'inline'
        spanLikes.style.display = 'inline' 
    }
    if (isUserCanLike.length > 0){
        likeButton.textContent = "Unlike"
    }else{
        likeButton.textContent = "Like"
    }
    return newDetails
}

async function deleteMovie(event){
    let id = event.target.dataset.id
    let url = `${baseUrl}/${id}`

    let result = await makeRequest(url, "DELETE", '', true)
    home.loadView()
}
async function loadEditPage(event){
    let id = event.target.dataset.id
    editMovie.loadView(id)
}

async function movieVote(event){
    let vote = event.target
    let movieId = event.target.dataset.id
    if (vote.textContent == 'Like'){
        await makeRequest(likesUrl, "POST", {movieId}, true)
        description.loadView(movieId)
    }else if(vote.textContent == 'Unlike'){
        let id = isUserCanLike[0]._id
        let url = `${unlikeUrl}/${id}`
        await makeRequest(url, "DELETE", '', true)
        description.loadView(movieId)
    }
}
