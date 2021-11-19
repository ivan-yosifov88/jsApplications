import { makeRequest } from "../helpers.js";
import userData from "../userData.js";
import addMovie from "./addMovie.js";
import home from "./home.js";
import login from "./login.js";
import description from "./movieDescription.js";
import register from "./register.js";

let logoutUrl = 'http://localhost:3030/users/logout'
let section = undefined;
let main = undefined;


let welcomeLink = undefined;
let guestViewElements = undefined
let userViewElements = undefined

let view = {
    'movies' : () => home.loadView(),
    'home': () => home.loadView(),
    'logout': () => logoutUser(),
    'login': () => login.loadView(),
    'register': () => register.loadView()
}

function initialize(domElement, container){
    section = domElement;
    welcomeLink = section.querySelector('.welcome');
    guestViewElements =  section.querySelectorAll('.guest-view')
    userViewElements = section.querySelectorAll('.user-view')

    section.addEventListener('click', changeView);
    main = container;

    if (userData.isUserLogged()){
        loggedUserView(localStorage.getItem('email'))
    }else{
        guestView()
    }
}

function guestView(){
    welcomeLink.textContent = 'Welcome, quest';
    guestViewElements.forEach(element => element.style.display = 'block');
    userViewElements.forEach(element => element.style.display = 'none')

}
function loggedUserView(email){
    welcomeLink.textContent = `Welcome, ${email}`;
    userViewElements.forEach(element => element.style.display = 'block');
    guestViewElements.forEach(element => element.style.display = 'none')
    

}
function changeView(event){
    let selectedElement = event.target.id
    console.log(event.target)
    if (selectedElement != undefined){
        event.preventDefault()
        view[selectedElement]()
    }
}
async function logoutUser(){
    await makeRequest(logoutUrl, "GET", {} , true);
    userData.clearSession()
    login.loadView()
}
let nav = {
    initialize, 
    guestView,
    loggedUserView
}

export default nav