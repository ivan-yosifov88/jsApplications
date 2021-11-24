import { html } from '../node_modules/lit-html/lit-html.js';
import { until } from '../node_modules/lit-html/directives/until.js'
import { deleteBook, getAllBooks } from './helpers.js';

const bookTable = (booksPromise) => html `
<table>
    <thead>
        <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        ${until(booksPromise, html`<tr><td colSpan="3">Loading&hellip;</td></tr>`)}
    </tbody>
</table>`;

const bookRecord = (book) => html`
<tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
        <button @click=${() => onEdit(book)}>Edit</button>
        <button @click=${(event) => onDelete(book)}>Delete</button>
    </td>
</tr>`;
let ctx;
export function showBookShelf(context) {
    ctx = context
    return bookTable(loadBooks())
}

async function loadBooks() {
    const books = await getAllBooks();
    console.log(books)

    return Object.values(books).map(bookRecord)
}
async function onDelete(book) {
    await deleteBook(book._id)
    ctx.update()
}

async function onEdit(book){
    ctx.book = book
    console.log(ctx)
    ctx.update()
}