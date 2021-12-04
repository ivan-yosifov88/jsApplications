import { register } from "../api/data.js";
import { html } from "../library.js";

const registerViewTemplate = (onRegister) => html`
<section id="register-page" class="content auth">
    <form @submit=${onRegister} id="register">
        <div class="container">
            <div class="brand-logo"></div>
            <h1>Register</h1>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="maria@email.com">

            <label for="pass">Password:</label>
            <input type="password" name="password" id="register-password">

            <label for="con-pass">Confirm Password:</label>
            <input type="password" name="confirm-password" id="confirm-password">

            <input class="btn submit" type="submit" value="Register">

            <p class="field">
                <span>If you already have profile click <a href="/login">here</a></span>
            </p>
        </div>
    </form>
</section>`;

export function registerPage(context) {
    context.render(registerViewTemplate(onRegister));

    async function onRegister(event) {
        event.preventDefault();
        const form = new FormData(event.target);

        const email = form.get('email').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('confirm-password').trim();


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

