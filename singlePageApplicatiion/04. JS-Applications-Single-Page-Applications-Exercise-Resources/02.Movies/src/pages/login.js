import { makeRequest } from "../helpers.js";
import userData from "../userData.js";
import home from "./home.js";

const loginUrl = 'http://localhost:3030/users/login';
let section = undefined;
let main = undefined;


function initialize(domElement, container){
    section = domElement;
    section.addEventListener('submit', loginUser)
    main = container 
    section.remove()
}

function loadView(){
    main.replaceChildren(section)
}

async function loginUser(event){
    event.preventDefault();
    let form = new FormData(event.target);
    let body = {
        email: form.get('email').trim(),
        password: form.get('password').trim()
    }
    if (Object.values(body).some(record => record == "")){
        alert('Please enter correct email and password')
        return
    }
    event.target.reset()
    try{
        let result = await makeRequest(loginUrl, "POST", body, false)
        userData.initialize(result)
    }catch(error){
        alert(error.message)
    }
    home.loadView()
}
let login = {
    initialize, 
    loadView
}

export default login