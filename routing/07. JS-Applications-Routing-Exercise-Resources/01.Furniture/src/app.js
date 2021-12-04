import { render, page } from './library.js';

// import page from "//unpkg.com/page/page.mjs";

import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { catalogPage } from './views/catalog.js';
import { loginPage } from './views/login.js';
import { myPage } from './views/my-furniture.js';
import { registerPage } from './views/register.js';
import { logout } from './api/data.js';
import { isValidSession } from './api/data-storage.js';

const root = document.querySelector('.container');

const guestNavigationView = document.querySelector('#guest');
const userNavigationView = document.querySelector('#user');

const logoutButton = document.querySelector('#logoutBtn')
logoutButton.addEventListener('click', onLogout);

page(contextDecorator);
page('/', catalogPage);
page('/details/:id', detailsPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/login', loginPage);
page('/register', registerPage);
page('/my-furniture', myPage);

navigationViewUpdate()
page.start();

function contextDecorator(context, next) {
    context.render = (content) => render(content, root);
    context.navigationViewUpdate = navigationViewUpdate
    next();
}

async function onLogout(event) {
    await logout();
    navigationViewUpdate()
    page.redirect('/');
}

function navigationViewUpdate(){
    if (isValidSession()){
        userNavigationView.style.display = 'inline-block';
        guestNavigationView.style.display = 'none';
    }else {
        userNavigationView.style.display = 'none';
        guestNavigationView.style.display = 'inline-block';
    }
}