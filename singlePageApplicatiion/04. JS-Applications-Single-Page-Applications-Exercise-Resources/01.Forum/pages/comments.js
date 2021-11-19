import requestUrl from "../constants.js"
import { createThemeTitle } from "../createElements/createThemeTitle.js"
import { createTopicComment } from "../createElements/createTopicComment.js"
import { createTopicInfo } from "../createElements/createTopicInfo.js"
import helperFunctions from "../helpers.js"

let section = undefined
let mainElement = undefined
let userId = undefined
let commentsView = undefined

function setupSection(divElement, main){
    section = divElement
    section.addEventListener('submit', loadComment)
    section.remove()
    mainElement = main
}
async function loadView(id){
    userId = id
    let url = requestUrl.commentUrl
    let options = {method : "GET"}
    let result = await helperFunctions.makeRequest(url, options)
    console.log(result)
    let objectPost = Object.values(result.posts).find(post => post._id == id)
    let objectComments = result.comments[id]
    if (objectPost == undefined){
        alert("Bad request")
        return
    }
    let {username, post, title, date} = objectPost
    mainElement.replaceChildren()
    mainElement.appendChild(createThemeTitle(title))
    commentsView = mainElement.querySelector('.comment')
    commentsView.appendChild(createTopicInfo(username, post, date))
    mainElement.appendChild(section)
    if (objectComments != undefined){
        Object.values(objectComments).forEach(comment => commentsView.appendChild(createTopicComment(comment.username, comment.date, comment.post)))
    }
    
}
async function loadComment(event){
    event.preventDefault()
    let fields = new FormData(event.target);
    let username = fields.get('username').trim();
    let post = (fields.get('postText')).trim();
    let date = new Date 
    let data = {
        username,
        post,
        date,
        userId,
    }
    if (username == ""){
        alert("Fields marked with * are required")
        return
    }
    event.target.reset()
    let url = requestUrl.commentUrl + `/comments/${userId}`
    let options = {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    let response = await helperFunctions.makeRequest(url, options)
    commentsView.appendChild(createTopicComment(response.username, response.date, response.post))
}
async function getAllComments(){

}

let comments = {
    setupSection,
    loadView
}

export default comments