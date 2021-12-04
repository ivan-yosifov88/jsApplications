import { getGameById, updateGameById } from "../api/data.js";
import { html } from "../library.js";

const editViewTemplate = (game, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value=${game.title}>

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value="${game.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${game.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value="${game.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary">${game.summary}</textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function editPage(context) {
    const game = await getGameById(context.params.id)
    context.render(editViewTemplate(game, onSubmit))
    async function onSubmit(event) {
        event.preventDefault()
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
        await updateGameById(game._id, data);
        context.page.redirect('/')
        event.target.reset()
    }

}