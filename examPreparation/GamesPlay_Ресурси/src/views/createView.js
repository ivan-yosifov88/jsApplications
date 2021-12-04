import { createGame } from "../api/data.js";
import { html } from "../library.js";

const createViewTemplate = (onSubmit) => html`
<section id="create-page" class="auth">
    <form @submit=${onSubmit} id="create">
        <div class="container">

            <h1>Create Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" placeholder="Enter game title...">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" placeholder="Enter game category...">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" placeholder="1">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo...">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary"></textarea>
            <input class="btn submit" type="submit" value="Create Game">
        </div>
    </form>
</section>`;

export function createPage(context) {
    context.render(createViewTemplate(onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const title = form.get('title').trim();
        const category = form.get('category').trim();
        const maxLevel = form.get('maxLevel').trim();
        const imageUrl = form.get('imageUrl').trim();
        const summary = form.get('summary').trim();
        if (title == '' || category == '' || maxLevel == '' || imageUrl == '' || summary == '') {
            return alert("All field are required!")
        };
        const data = {
            title,
            category,
            maxLevel,
            imageUrl,
            summary
        }
        await createGame(data);
        context.page.redirect('/')
        event.target.reset()
    }
}