import { login } from "../api/data.js";
import { html } from "../library.js";

const loginViewTemplate = (onLogin) => html`
<section id="login">
    <form @submit=${onLogin}id="login-form">
        <div class="container">
            <h1>Login</h1>
            <label for="email">Email</label>
            <input id="email" placeholder="Enter Email" name="email" type="text">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <input type="submit" class="registerbtn button" value="Login">
            <div class="container signin">
                <p>Dont have an account?<a href="/register">Sign up</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function loginPage(context) {
    context.render(loginViewTemplate(onLogin));

    async function onLogin(event){
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
        context.page.redirect('/all-memes');

    }
}
