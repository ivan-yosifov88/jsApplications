import { render, page } from './library.js';

import { isValidSession, userData } from './api/data-storage.js';
import { dashboardPage } from './views/dashboardView.js';
import { loginPage } from './views/loginView.js';
import { logout } from './api/data.js';
import { createPage } from './views/createView.js';
import { editPage } from './views/editView.js';
import { detailsPage } from './views/detailsView.js';

import { registerPage } from './views/registerView.js';
import { myBooksPage } from './views/myBooksView.js';


const root = document.querySelector('#site-content');

const guestNavigationView = document.querySelector('#guest');
const userNavigationView = document.querySelector('#user');
const welcomeMessage = document.querySelector('#user span');

const logoutButton = document.querySelector('#logoutButton')
logoutButton.addEventListener('click', onLogout);

page(contextDecorator);
page('/', dashboardPage);
page('/login', loginPage);
page('/register', registerPage)
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/my-books', myBooksPage)

navigationViewUpdate();
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
        userNavigationView.style.display = 'block';
        guestNavigationView.style.display = 'none';
        welcomeMessage.textContent = `Welcome, ${userData.email}`

    }else {
        userNavigationView.style.display = 'none';
        guestNavigationView.style.display = 'block';
    }
}