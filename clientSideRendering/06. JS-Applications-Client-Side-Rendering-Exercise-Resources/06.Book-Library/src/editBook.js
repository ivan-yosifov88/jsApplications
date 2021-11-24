import { html } from '../node_modules/lit-html/lit-html.js';
import { editBook } from './helpers.js';

const editBookTemplate = (book, context) => html`
<form @submit=${event => editForm(event, book, context)} id="edit-form">
    <input type="hidden" name="id" .value=${book._id}>
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title..." .value=${book.title}>
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author..." .value=${book.author}>
    <input type="submit" value="Save">
</form>`;

export function showEditBook (context){
    if (context.book == undefined){
        return null
    }else {
        return editBookTemplate(context.book, context)
    }
    
}

async function editForm(event, book, context) {
    event.preventDefault();
    const form = new FormData(event.target);

    const id = form.get('id')
    const title = form.get('title').trim();
    const author = form.get('author').trim();
    let requestBody = {
        title,
        author,
        _id: id
    }
    let result = await editBook(id, requestBody)
    console.log(result)
    delete context.book
    context.update()
}