import { getAllBooks } from "../api/data.js";
import { html } from "../library.js";

const dashboardViewTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    ${books.length == 0 ? html `<p class="no-books">No books in database!</p>` 
    : booksTemplate(books)}
</section>`;

const booksTemplate = (books) => html`
    <ul class="other-books-list">
        ${books.map(singleBookTemplate)}
    </ul>`;

const singleBookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

export async function dashboardPage(context) {
    const books = await getAllBooks()
    context.render(dashboardViewTemplate(books))
}