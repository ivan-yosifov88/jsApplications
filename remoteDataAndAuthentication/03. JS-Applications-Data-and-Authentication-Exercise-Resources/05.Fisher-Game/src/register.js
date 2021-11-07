const registerUrl = 'http://localhost:3030/users/register';

const registerForm  = document.querySelector('#register-form');
registerForm.addEventListener('submit', registerLogin);


async function registerLogin(event){
    event.preventDefault()
    const formInputs = new FormData(registerForm);
    let userEmail = formInputs.get("email");
    let userPassword = formInputs.get("password");
    let userRepeatPassword = formInputs.get("rePass");
    

    try{
        if (isInputs(userEmail, userPassword, userRepeatPassword) == false){
            throw new Error ("Please enter email and password")
        }
        if (isPasswordAndRepeatPasswordValid(userPassword, userRepeatPassword) == false){
            throw new Error ("Password and repeat password do not match")
        }
        let options = {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        };

        let response = await makeRequest(registerUrl, options);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('id', response._id);
        localStorage.setItem('email', response.email)
        window.location.assign('./index.html')

    }catch(error){
        alert(error.message);
        registerForm.reset()
    };
   
}
async function makeRequest(url, options){
    const request = await fetch(url, options);
        if (request.status != 200){
            throw new Error("Wrong email or password")
        }
        const data = await request.json();
        return data
}
function isInputs(...params){
    if (params.some(parameter => parameter == '' || parameter == undefined)){
        return false
    }
    return true
}
function isPasswordAndRepeatPasswordValid(password, repeatPassword){
    return password == repeatPassword
}