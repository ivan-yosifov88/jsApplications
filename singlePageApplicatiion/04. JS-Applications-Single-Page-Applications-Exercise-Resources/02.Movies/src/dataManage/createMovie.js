import { createElement } from "../helpers.js";
import description from "../pages/movieDescription.js";
import userData from "../userData.js";

export function createMovie(data) {
    let newMovie = createElement('div', { class: "card mb-4" },
        createElement('img', { class: "card-img-top", src: data.img, alt: "Card image cap", width: "400" }),
        createElement('div', { class: "card-body" },
            createElement('h4', { class: "card-title" }, data.title),
        ),
        createElement('div', { class: "card-footer" },
            createElement('a', { href: "#"},
                createElement('button', { type: "button", class: "btn btn-info hidden", "data-id" :data._id  }, "Details")
            )
        )

    )
    let aElement = newMovie.querySelector('button')
    if (userData.isUserLogged()){
        aElement.style.display = 'block';
        aElement.addEventListener('click', loadDetails)
    }else{
        aElement.style.display = 'none';
    }
    return newMovie
}
function loadDetails(event){
    let id = event.target.dataset.id
    description.loadView(id)
}
