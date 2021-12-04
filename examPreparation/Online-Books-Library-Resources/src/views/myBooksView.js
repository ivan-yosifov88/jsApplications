import { getUserData, isValidSession, userData } from "../api/data-storage.js";
import { getUserBooks } from "../api/data.js";
import { html } from "../library.js";

function myBooksTemplate(books, singleBookTemplate) {
    return html`
<section id="my-books-page" class="my-books">
    <h1>My Books</h1>
    ${books.length == 0
            ? html`<p class="no-books">No books in database!</p>`
            : html`<ul class="my-books-list">
        ${books.map(singleBookTemplate)}
    </ul>`}

</section>`;
}

// const booksTemplate = (books) => html`
// <ul class="my-books-list">
//     ${books.map(singleBookTemplate)}
// </ul>`;

const singleBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;


export async function myBooksPage(context) {
    if (isValidSession()){
        const user = JSON.parse(getUserData())
        const userId = user._ownerId
        const books = await getUserBooks(userId)
        context.render(myBooksTemplate(books, singleBookTemplate))
    }
}
