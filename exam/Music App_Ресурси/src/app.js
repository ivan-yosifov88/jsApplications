import { render, page } from './library.js';
import { isValidSession} from './api/data-storage.js';

import { loginPage } from './views/loginView.js';
import { logout } from './api/data.js';
import { createPage } from './views/createView.js';
import { editPage } from './views/editView.js';
import { detailsPage } from './views/detailsView.js';
import { registerPage } from './views/registerView.js';
import { homePage } from './views/homeView.js';
import { catalogPage } from './views/catalogView.js';
import { searchPage } from './views/searchView.js';


const root = document.querySelector('#main-content');

const guestNavigationView = document.querySelectorAll('#guest');
const userNavigationView = document.querySelectorAll('#user');


const logoutButton = document.querySelector('.logoutButton')
logoutButton.addEventListener('click', onLogout);

page(contextDecorator);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage)
page('/catalog', catalogPage)
page('/create', createPage);
page('/edit/:id', editPage);
page('/details/:id', detailsPage);
page('/search', searchPage)

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
        [...userNavigationView].map(record => record.style.display = 'block');
        [...guestNavigationView].map(record => record.style.display = 'none');
        // userNavigationView.style.display = 'block';
        // guestNavigationView.style.display = 'none';

    }else {
        [...userNavigationView].map(record => record.style.display = 'none');
        [...guestNavigationView].map(record => record.style.display = 'block');
        // userNavigationView.style.display = 'none';
        // guestNavigationView.style.display = 'block';
    }
}
