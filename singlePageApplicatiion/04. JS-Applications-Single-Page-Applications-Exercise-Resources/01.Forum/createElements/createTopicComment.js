import helperFunctions from "../helpers.js"


let createElement = helperFunctions.createElement


export function createTopicComment(username, date, post) {

    let formatDate = new Date(date).toUTCString()

    let newTopicComment = createElement('div', { class: "user-comment main-view" },
        createElement('div', { class: "topic-name-wrapper" },
            createElement('div', { class: "topic-name" },
                createElement('p', {}, username,
                    createElement('strong', {}, ' commented on '),
                    createElement('time', {}, formatDate),
                ),
                createElement('div', { class: "post-content" },
                    createElement('p', {}, post)
                )
            )
        )
    )

    return newTopicComment

}