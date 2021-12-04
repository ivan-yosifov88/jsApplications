import { register } from "../api/data.js";
import { html } from "../library.js";

const registerViewTemplate = (onRegister) => html`
 <section id="register">
            <form @submit=${onRegister} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`;

export function registerPage(context) {
    context.render(registerViewTemplate(onRegister));

    async function onRegister(event){
        event.preventDefault();
        const form = new FormData(event.target);
    
        const username = form.get('username').trim();
        const email = form.get('email').trim();
        const password = form.get('password').trim();
        const repeatPass = form.get('repeatPass').trim();
        const gender = form.get('gender');

        if (username == '' || email == '' || password == '' || repeatPass == '') {
            return alert('All fields are required!')
        };
        if (password != repeatPass) {
            return alert('Passwords don\'t match!')
        };

        await register(email, password, username, gender);
        context.navigationViewUpdate()
        event.target.reset()
        context.page.redirect('/all-memes');

    }
}

