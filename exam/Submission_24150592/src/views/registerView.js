import { register } from "../api/data.js";
import { html } from "../library.js";

const registerViewTemplate = (onRegister) => html`
<section id="registerPage">
    <form @submit=${onRegister}>
        <fieldset>
            <legend>Register</legend>

            <label for="email" class="vhide">Email</label>
            <input id="email" class="email" name="email" type="text" placeholder="Email">

            <label for="password" class="vhide">Password</label>
            <input id="password" class="password" name="password" type="password" placeholder="Password">

            <label for="conf-pass" class="vhide">Confirm Password:</label>
            <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

            <button type="submit" class="register">Register</button>

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </fieldset>
    </form>
</section>`;

export function registerPage(context) {
    context.render(registerViewTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const form = new FormData(event.target);

        const email = form.get('email').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('conf-pass').trim();


        if (email == '' || password == '' || repeatPass == '') {
            return alert('All fields are required!')
        };
        if (password != repeatPass) {
            return alert('Passwords don\'t match!')
        };

        await register(email, password);
        context.navigationViewUpdate()
        event.target.reset()
        context.page.redirect('/');

    }
}

