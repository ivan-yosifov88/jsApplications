import comments from "./pages/comments.js";
import home from "./pages/home.js";

let views = {
    'home-view': home.loadView,
    'comments-view': comments.loadView
}

function initialize(view){
   view.addEventListener('click', changeViewHandler)
}
function changeViewHandler(event){
    let dataId = event.target.dataset.id
    let id = event.target.id
    console.log(dataId)
    views[id](dataId)
}

let viewChanger = {
    initialize
}
export default viewChanger