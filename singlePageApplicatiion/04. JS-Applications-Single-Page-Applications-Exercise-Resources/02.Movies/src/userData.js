import nav from "./pages/nav.js"

function initialize(data){
    window.localStorage.setItem('token', data.accessToken)
    window.localStorage.setItem('id', data._id)
    window.localStorage.setItem('email', data.email)
    nav.loggedUserView(data.email)
}
function clearSession(){
    window.localStorage.clear()
    nav.guestView()
}
function isUserLogged(){
    return localStorage.length > 0
}
let userData = {
    initialize,
    clearSession,
    isUserLogged
}
export default userData