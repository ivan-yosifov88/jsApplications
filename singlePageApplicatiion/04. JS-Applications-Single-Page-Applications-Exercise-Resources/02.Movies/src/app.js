import addMovie from "./pages/addMovie.js";
import editMovie from "./pages/editMovie.js";
import home from "./pages/home.js";
import login from "./pages/login.js";
import description from "./pages/movieDescription.js";
import nav from "./pages/nav.js";
import register from "./pages/register.js";


setup()
function setup(){
    const containerDiVElement = document.querySelector('#container');
    const mainView = document.querySelector('.main-view');

    addMovie.initialize(document.querySelector('#add-movie'), mainView);
    editMovie.initialize(document.querySelector('#edit-movie'), mainView);
    home.initialize(document.querySelector('#home-page'), mainView);
    login.initialize(document.querySelector('#form-login'), mainView);
    description.initialize(document.querySelector('#movie-example'), mainView);
    
    nav.initialize(document.querySelector('.navbar'), containerDiVElement);
    register.initialize(document.querySelector('#form-sign-up'), mainView);

    
    home.loadView()

    
    
    
}