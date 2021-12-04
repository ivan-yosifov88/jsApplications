import { getUserData, isValidSession, userData } from "../api/data-storage.js";
import { deleteBookById, getBookById } from "../api/data.js";
import { html } from "../library.js";

const detailsViewTemplate = (book, onDelete, isOwner) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
            ${isOwner ? html `
            <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
            : ''}
            
            <!-- Bonus -->
            <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
            <a class="button" href="#">Like</a>

            <!-- ( for Guests and Users )  -->
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: 0</span>
            </div>
            <!-- Bonus -->
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

export async function detailsPage(context) {
    const book = await getBookById(context.params.id)
    let isOwner = undefined;
    if (isValidSession()) {
        const user = JSON.parse(getUserData())
        isOwner = (user._ownerId == book._ownerId)
    }
    context.render(detailsViewTemplate(book, onDelete, isOwner))

    async function onDelete() {
        const choice = confirm("Are you sure you want to delete this book?")
        if (choice) {
            await deleteBookById(book._id)
            context.page.redirect('/')
        }
    }

}
