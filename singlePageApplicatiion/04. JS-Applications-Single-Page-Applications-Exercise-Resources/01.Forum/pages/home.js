
import requestUrl from "../constants.js"
import { createNewTopic } from "../createElements/createTopic.js"
import helperFunctions from "../helpers.js"
import topics from "./topics.js"

let section = undefined
let mainElement = undefined

function setupSection(divElement, main){
    section = divElement
    mainElement = main
    section.remove()
}

function loadView(){
    mainElement.replaceChildren(section)
    section.querySelector('form').addEventListener('submit', addTopic);
    mainElement.appendChild(topics.view())
}

async function addTopic(event){
    event.preventDefault()
    console.log(event.submitter)
    if (event.submitter.className == "cancel"){
        event.currentTarget.reset()
        console.log('reset form')
        return
    }
    let fields = new FormData(event.currentTarget);
    let title = fields.get('topicName').trim();
    let username = fields.get('username').trim();
    let post = (fields.get('postText')).trim();
    let date = new Date 
    let data = {
        title,
        username,
        post,
        date
    }
    if (Object.values(data).some(field => field == '')){
        alert("Fields marked with * are required")
        return
    }
    event.currentTarget.reset()
    const url = requestUrl.postUrl
    
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    let result = await helperFunctions.makeRequest(url, options)
    let topic = createNewTopic(result)
    topics.attachTopic(topic)
}
let home = {
    setupSection,
    loadView
}

export default home