
let section = undefined
let mainElement = undefined

function setupSection(divElement, main){
    section = divElement
    section.remove()
    mainElement = main
}

function attachTopic(topic){
   section.appendChild(topic)
}

function view(){
    return section
}

let topics = {
    setupSection,
    attachTopic,
    view
}

export default topics
