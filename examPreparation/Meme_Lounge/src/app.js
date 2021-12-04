import { render, page } from './library.js';

import { isValidSession, userData } from './api/data-storage.js';
import { homePage } from './views/homeView.js';
import { loginPage } from './views/loginView.js';
import { logout } from './api/data.js';
import { allMemesPage } from './views/allMemesView.js';
import { createPage } from './views/createView.js';
import { editPage } from './views/editView.js';
import { detailsPage } from './views/detailsView.js';
import { myProfilePage } from './views/profileView.js';
import { registerPage } from './views/registerView.js';

const root = document.querySelector('main');

const guestNavigationView = document.querySelector('.guest');
const userNavigationView = document.querySelector('.user');
const welcomeMessage = document.querySelector('.profile span');

const logoutButton = document.querySelector('#logoutBtn')
logoutButton.addEventListener('click', onLogout);

page(contextDecorator);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/all-memes', allMemesPage);
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/my-profile', myProfilePage)

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