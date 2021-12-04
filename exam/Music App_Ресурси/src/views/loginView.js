import { login } from "../api/data.js";
import { html } from "../library.js";


const loginViewTemplate = (onLogin) => html`
<section id="loginPage">
    <form @submit =${onLogin}>
        <fieldset>
            <legend>Login</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <button type="submit" class="login">Login</button>

            <p class="field">
                <span>If you don't have profile click <a href="/register">here</a></span>
            </p>
        </fieldset>
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
