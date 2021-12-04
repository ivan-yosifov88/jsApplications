import { login } from "../api/data.js";
import { html } from "../library.js";

const loginViewTemplate = (onLogin) => html`
<section id="login-page" class="login">
    <form @submit=${onLogin} id="login-form" action="" method="">
        <fieldset>
            <legend>Login Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Login">
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
