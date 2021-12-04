import { getBookById, updateBookById } from "../api/data.js";
import { html } from "../library.js";

const editViewTemplate = (book, onSubmit) => html`
<section id="edit-page" class="edit">
    <form @submit=${onSubmit} id="edit-form" action="#" method="">
        <fieldset>
            <legend>Edit my Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" .value="${book.title}">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description"
                        id="description">${book.description}</textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" .value="${book.imageUrl}">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type" .value="${book.type}">
                        <option value="Fiction" selected>Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Save">
        </fieldset>
    </form>
</section>`;

export async function editPage(context) {
    const book = await getBookById(context.params.id)
    context.render(editViewTemplate(book, onSubmit))
    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const title = form.get('title').trim();
        const description = form.get('description').trim();
        const imageUrl = form.get('imageUrl').trim();
        const type = form.get('type');
        if (title == '' || description == '' || imageUrl == '') {
            return alert("All field are required!")
        };
        const data = {
            title,
            description,
            imageUrl,
            type
        }
        await updateBookById(book._id, data);
        context.page.redirect('/')
        event.target.reset()
    }

}