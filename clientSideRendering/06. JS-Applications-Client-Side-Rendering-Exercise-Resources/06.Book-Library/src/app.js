import { render } from '../node_modules/lit-html/lit-html.js';
import { showaAddBook } from './addBook.js';
import { showBookShelf } from './bookShelf.js';
import { showEditBook } from './editBook.js';

const root = document.querySelector('body');

const context = {
    update
}
update()
function update() {
    render([
        showBookShelf(context),
        showaAddBook(context),
        showEditBook(context)
    ], root)
}