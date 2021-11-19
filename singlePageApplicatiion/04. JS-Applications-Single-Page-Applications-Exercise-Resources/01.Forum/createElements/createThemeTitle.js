import helperFunctions from "../helpers.js"


let createElement = helperFunctions.createElement


export function createThemeTitle(title) {
    let newTopicTitle = createElement('div', { class: "theme-content main-view" },
        createElement('div', { class: "theme-title" },
            createElement('div', { class: "theme-name-wrapper" },
                createElement('div', { class: "theme-name" },
                    createElement('h2', {}, title)
                )
            )
        ),
        createElement('div', { class: "comment main-view" })
    )

    return newTopicTitle

}