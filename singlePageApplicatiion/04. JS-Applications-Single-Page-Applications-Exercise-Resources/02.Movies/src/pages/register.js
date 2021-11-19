import { makeRequest } from "../helpers.js";
import userData from "../userData.js";
import home from "./home.js";

const registerUrl = 'http://localhost:3030/users/register';
let section = undefined;
let main = undefined;

function initialize(domElement, container){
    section = domElement;
    section.addEventListener('submit', registerUser)
    main = container 
    section.remove()
}

function loadView(){
    main.replaceChildren(section)
}
async function registerUser(event){
    event.preventDefault();
    let form = new FormData(event.target);
    let email = form.get('email').trim();
    let password = form.get('password').trim();
    let repeatPassword = form.get('repeatPassword').trim();
    if (email == '' || password.length < 6 || repeatPassword != password){
        alert('Please enter username and password')
        return
    }
    let body = {
        email,
        password
    }
    event.target.reset()
    try{
        let result = await makeRequest(registerUrl, "POST", body, false)
        userData.initialize(result)
    }catch(error){  
        alert(error.message)
    }
    home.loadView()
}
let register = {
    initialize, 
    loadView
}
export default register
