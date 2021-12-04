import { login } from "../api/data.js";
import { html } from "../library.js";

const loginViewTemplate = (onLogin) => html`
<section id="login-page" class="auth">
    <form @submit=${onLogin} id="login">

        <div class="container">
            <div class="brand-logo"></div>
            <h1>Login</h1>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

            <label for="login-pass">Password:</label>
            <input type="password" id="login-password" name="password">
            <input type="submit" class="btn submit" value="Login">
            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function loginPage(context) {
    context.render(loginViewTemplate(onLogin));

    async function onLogin(event) {
        event.preventDefault();
        const form = new FormData(event.target);

        const email = form.get('email').trim();
        const password = form.get('password').trim();

        if (email == '' || password == '') {
            return alert('All fields are required!')
        };
        await login(email, password);
        context.navigationViewUpdate();
        event.target.reset()
        context.page.redirect('/');

    }
}
