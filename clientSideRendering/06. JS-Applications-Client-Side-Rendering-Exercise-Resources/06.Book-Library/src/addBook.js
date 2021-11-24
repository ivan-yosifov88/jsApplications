import { html } from '../node_modules/lit-html/lit-html.js';
import { createBook } from './helpers.js';

const addBookTemplate = () => html`
<form @submit=${createForm} id="add-form">
    <h3>Add book</h3>
    <label>TITLE</label>
    <input type="text" name="title" placeholder="Title...">
    <label>AUTHOR</label>
    <input type="text" name="author" placeholder="Author...">
    <input type="submit" value="Submit">
</form>`;

let update;
export function showaAddBook(context) {
    if (context.book == undefined){
        update = context.update
        return addBookTemplate()
    }else {
        return null
    }
}

async function createForm(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const title = form.get('title').trim();
    const author = form.get('author').trim();
    let requestBody = {
        title,
        author
    }
    await createBook(requestBody)
    event.target.reset()
    update()
}