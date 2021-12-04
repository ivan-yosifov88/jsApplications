import { isValidSession } from "../api/data-storage.js";
import { getAllAlbums } from "../api/data.js";
import { html } from "../library.js";


const catalogTemplate = (albums, albumTemplate, isLoggedInUser) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${albums.length == 0 
    ? html `<p>No Albums in Catalog!</p>` 
    : albums.map(album => albumTemplate(album, isLoggedInUser))}
</section>`;




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


export async function catalogPage(context) {
    let isLoggedInUser = false;
    if (isValidSession()) {
        isLoggedInUser = true;
    }
    const albums = await getAllAlbums()
    console.log(albums)
    context.render(catalogTemplate(albums, albumTemplate ,isLoggedInUser))
}
