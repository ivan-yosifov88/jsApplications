
import { isValidSession } from "../api/data-storage.js";
import { getSearchedAlbum } from "../api/data.js";
import { html } from "../library.js";


const searchViewTemplate = (result, onSearch, isLoggedInUser, resultTemplate) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click= ${onSearch}class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
        ${resultTemplate ? resultTemplate(result, isLoggedInUser) : ''}
    </div>`
  
function resultTemplate(result, isLoggedInUser){
    if (result.length == 0){
        return html`<p class="no-result">No result.</p>`
    }else {
        return result.map(album => albumTemplate(album, isLoggedInUser))
    }

}

const albumTemplate = (album, isLoggedInUser) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        ${isLoggedInUser ? html `
            <div class="btn-group">
                <a href="/details/${album._id}" id="details">Details</a>
            </div>` : ''} 
    </div>
</div>`;
     
export async function searchPage(context) {
    context.render(searchViewTemplate([], onSearch, false))

    async function onSearch(){
        let isLoggedInUser = false;
        if (isValidSession()) {
            isLoggedInUser = true;
        }

        const query = document.querySelector('#search-input').value.trim()
        if (query == '') {
            return alert("Please enter an album")
        }

        const result = await getSearchedAlbum(query)
        console.log(result)
        await context.render(searchViewTemplate(result, onSearch, isLoggedInUser, resultTemplate))
        
    }
}
