import { getAlbumById, updateAlbumById} from "../api/data.js";
import { html } from "../library.js";



const editViewTemplate = (album, onSubmit) => html`
<section class="editPage">
    <form @submit =${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value="${album.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${album.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value="${album.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${album.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value="${album.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="${album.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${album.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function editPage(context) {
    const album = await getAlbumById(context.params.id)
    context.render(editViewTemplate(album, onSubmit))
    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const name = form.get('name').trim();
        const imgUrl = form.get('imgUrl').trim();
        const price = form.get('price').trim();
        const releaseDate = form.get('releaseDate').trim();
        const artist = form.get('artist').trim();
        const genre = form.get('genre').trim();
        const description = form.get('description').trim();

        if (name == '' || imgUrl == '' || price == '' || releaseDate == '' || artist == '' || genre == '' || description == '') {
            return alert("All field are required!")
        };
        const data = {
            name,
            imgUrl,
            price,
            releaseDate,
            artist,
            genre,
            description
        }
        await updateAlbumById(album._id, data);
        context.page.redirect(`/details/${album._id}`)
        event.target.reset()
    }

}
