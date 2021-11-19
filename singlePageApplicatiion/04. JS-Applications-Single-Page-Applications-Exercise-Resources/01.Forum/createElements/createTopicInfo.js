import helperFunctions from "../helpers.js"


let createElement = helperFunctions.createElement


export function createTopicInfo(username, post, date) {


    let formatDate = new Date(date).toUTCString()

    let newTopicInfo =
        createElement('div', { class: "header" },
            createElement('img', { src: "./static/profile.png", alt: "avatar" },),
            createElement('p', {}, username,
                createElement('span', {}, " posted on "),
                createElement('time', {}, formatDate)),
            createElement('p', { class: "post-content" }, post)
        )
    return newTopicInfo

}

// let d =new Date
// d.toLocaleTimeString()