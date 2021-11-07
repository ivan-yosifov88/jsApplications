const loginUrl = 'http://localhost:3030/users/login';

const loginForm  = document.querySelector('#login-form');
loginForm.addEventListener('submit', userLogin);


async function userLogin(event){
    event.preventDefault()
    const formInputs = new FormData(loginForm);
    let userEmail = formInputs.get("email");
    let userPassword = formInputs.get("password");

    try{
        if (isInputs(userEmail, userPassword) == false){
            throw new Error ("Please enter email and password")
        }
        let options = {
            method: "POST",
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: userEmail,
                password: userPassword
            })
        };

        let response = await makeRequest(loginUrl, options);
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('id', response._id);
        localStorage.setItem('email', response.email)
        window.location.assign('./index.html')

    }catch(error){
        alert(error.message);
        loginForm.reset()
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