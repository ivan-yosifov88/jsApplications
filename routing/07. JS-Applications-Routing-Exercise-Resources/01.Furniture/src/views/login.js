import { login } from "../api/data.js";
import { html } from "../library.js";

const loginTemplate = (onSubmit, errorMessage) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Login User</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            ${errorMessage ? html ` <div class="form-group error">${errorMessage}!</div>` : null}
            <div class="form-group">
                <label class="form-control-label" for="email">Email</label>
                <input class=${"form-control" + (errorMessage ? " is-invalid " : "")} id="email" type="text" name="email">
            </div>
            <div class="form-group">
                <label class="form-control-label" for="password">Password</label>
                <input class=${"form-control" + (errorMessage ? " is-invalid " : "")} id="password" type="password" name="password">
            </div>
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
    </div>
</form>`;



export function loginPage(context) {
    update();

    function update (errorMessage) {
        context.render(loginTemplate(onSubmit, errorMessage));
    };

    async function onSubmit(event) {
        event.preventDefault();
        const form = new FormData(event.target);
        const email = form.get('email').trim();
        const password = form.get('password').trim();

        try {
            await login(email, password);
            context.navigationViewUpdate();
            context.page.redirect('/');
        } catch (error) {
            update(error.message)
        }
        event.target.reset()
    }
}