import { createMovieDetails } from "../dataManage/createDetails.js";
import { makeRequest } from "../helpers.js";

const moviesUrl = 'http://localhost:3030/data/movies'
let section = undefined;
let main = undefined;
let detailSection = undefined

function initialize(domElement, container){
    section = domElement;
    detailSection = section.querySelector('.row.bg-light.text-dark')
    main = container 
    section.remove()
}

async function loadView(id){
    // main.replaceChildren(section)
    // let data = await getMovieData(id)
    let data = await getMovieData(id)
    detailSection.replaceChildren(createMovieDetails(data.details, data.likes, data.userLikes))
    main.replaceChildren(section)
}
export async function getMovieData(id){
    let url = `${moviesUrl}/${id}`
    let userId = localStorage.getItem('id')
    let numberOfLikesUrl = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;
    let likesOfUserUrl = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22`
    try{
        // let response = await makeRequest(url, "GET", '', false)
        // let likesResponse = await makeRequest(url, "GET", '', false)
        let [response, likesResponse, userResponse] = await Promise.all([
            await fetch (url),
            await fetch(numberOfLikesUrl), 
            await fetch(likesOfUserUrl)
        ])
        let [details, likes, userLikes] = await Promise.all([
            response.json(),
            likesResponse.json(),
            userResponse.json()
        ])
        return {details, likes, userLikes}
    }catch(error){
        alert(error.message)
    }
}
let description = {
    initialize, 
    loadView
}
export default description