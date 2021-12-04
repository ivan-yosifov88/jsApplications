import { userData } from "../api/data-storage.js";
import { deleteMemeById, getMemeById } from "../api/data.js";
import { html } from "../library.js";

const detailsViewTemplate = (meme, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
               ${meme.description}
            </p>
            ${meme._ownerId == userData._ownerId ? html `
            <a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` 
            : ''}
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->

        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    const meme = await getMemeById(context.params.id)
    console.log(meme)
    context.render(detailsViewTemplate(meme, onDelete));

    async function onDelete()  {
        const choice = confirm("Are you sure you want to delete this record?")
        if (choice) {
            await deleteMemeById(meme._id)
            context.page.redirect('/all-memes')
        }
    }

}
