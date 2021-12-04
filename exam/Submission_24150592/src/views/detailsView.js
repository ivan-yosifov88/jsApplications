import { getUserData, isValidSession } from "../api/data-storage.js";
import { deleteAlbumById, getAlbumById } from "../api/data.js";
import { html } from "../library.js";

const detailsViewTemplate = (album, onDelete, isOwner) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}c</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>Description: ${album.description}</p>
            </div>

           ${isOwner 
            ? html `
            <div class="actionBtn">
                <a href="/edit/${album._id}" class="edit">Edit</a>
                <a @click= ${onDelete} href="javascript:void(0)" class="remove">Delete</a>
            </div>` 
            : ''}
            
        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    const album = await getAlbumById(context.params.id)
    let isOwner = undefined;
    if (isValidSession()) {
        const user = JSON.parse(getUserData())
        isOwner = (user.id == album._ownerId)
    }
    context.render(detailsViewTemplate(album, onDelete, isOwner))

    async function onDelete() {
        const choice = confirm("Are you sure you want to delete this record?")
        if (choice) {
            await deleteAlbumById(album._id)
            context.page.redirect('/catalog')
        }
    }

}
