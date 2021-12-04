import { register } from "../api/data.js";
import { html } from "../library.js";

const registerTemplate = (onSubmit, errorMessage) => html `
<div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
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
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${"form-control" + (errorMessage ? " is-invalid " : "")} id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>`;

export function registerPage(context) {
    update();

    function update(errorMessage){
        context.render(registerTemplate(onSubmit, errorMessage));
    };

    async function onSubmit(event){
        event.preventDefault();
        const form = new FormData(event.target);
        const email = form.get('email').trim();
        const password = form.get('password').trim();
        const rePass = form.get('rePass').trim();
        
        try {
            await register(email, password)
            context.page.redirect('/')
        } catch (error) {
            update(error)
        }
        context.navigationViewUpdate()
        event.target.reset()
    }
}
