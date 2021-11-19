import viewChanger from "./changeView.js";
import helperFunctions from "./helpers.js";
import comments from "./pages/comments.js";
import home from "./pages/home.js";
import topics from "./pages/topics.js";





setup()


function setup(){
    const divContainer = document.querySelector('.container');
    const mainElement = document.querySelector('main');
    const mainView = document.querySelectorAll('.main-view')
    home.setupSection(document.querySelector('#home'), mainElement);
    comments.setupSection(document.querySelector('#comments'), mainElement);
    topics.setupSection(document.querySelector('.topic-container'))
    viewChanger.initialize(document.querySelector('.link'))

    home.loadView()
}