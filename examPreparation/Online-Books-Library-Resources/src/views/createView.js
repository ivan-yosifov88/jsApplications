import { createBook } from "../api/data.js";
import { html } from "../library.js";

const createViewTemplate = (onSubmit) => html`
<section id="create-page" class="create">
    <form @submit=${onSubmit} id="create-form" action="" method="">
        <fieldset>
            <legend>Add new Book</legend>
            <p class="field">
                <label for="title">Title</label>
                <span class="input">
                    <input type="text" name="title" id="title" placeholder="Title">
                </span>
            </p>
            <p class="field">
                <label for="description">Description</label>
                <span class="input">
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                </span>
            </p>
            <p class="field">
                <label for="image">Image</label>
                <span class="input">
                    <input type="text" name="imageUrl" id="image" placeholder="Image">
                </span>
            </p>
            <p class="field">
                <label for="type">Type</label>
                <span class="input">
                    <select id="type" name="type">
                        <option value="Fiction">Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Mistery">Mistery</option>
                        <option value="Classic">Clasic</option>
                        <option value="Other">Other</option>
                    </select>
                </span>
            </p>
            <input class="button submit" type="submit" value="Add Book">
        </fieldset>
    </form>
</section>`;

export function createPage(context) {
    context.render(createViewTemplate(onSubmit));

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
        await createBook(data);
        context.page.redirect('/')
        event.target.reset()
    }
}