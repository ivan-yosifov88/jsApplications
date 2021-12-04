import { getMemeById, updateMemeById } from "../api/data.js";
import { html } from "../library.js";

const editViewTemplate = (meme, onSubmit) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value = ${meme.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value = ${meme.description}>
                        </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value =${meme.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editPage(context) {
    const meme = await getMemeById(context.params.id)
    context.render(editViewTemplate(meme, onSubmit))
    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const title = form.get('title').trim();
        const description = form.get('description').trim();
        const imageUrl = form.get('imageUrl').trim();
        if (title == '' || description == '' || imageUrl == '') {
            return alert("All field are required!")
        };
        const data = {
            title,
            description,
            imageUrl
        }
        await updateMemeById(meme._id, data);
        context.page.redirect('/all-memes')
        event.target.reset()
    }

}