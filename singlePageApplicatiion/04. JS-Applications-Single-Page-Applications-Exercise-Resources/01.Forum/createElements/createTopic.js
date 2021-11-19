import viewChanger from "../changeView.js";
import helperFunctions from "../helpers.js";

let createElement = helperFunctions.createElement

export function createNewTopic(data) {
    let { title, username, date, _id } = data
    let newTopic =
        createElement('div', { class: "topic-container main-view" },
            createElement('div', { class: "topic-name-wrapper" },
                createElement('div', { class: "topic-name" },
                    createElement('a', { href: "#", class: "normal" },
                        createElement('h2', { class: "link", 'data-id': _id, id: "comments-view" }, title)),
                    createElement('div', { class: "columns" },
                        createElement('div', {},
                            createElement('p', {}, "Date:",
                                createElement('time', {}, date),
                                createElement('div', { class: "nick-name" },
                                    createElement('p', {}, "Username:",
                                        createElement('span', {}, username)))))))));

    viewChanger.initialize(newTopic)
    return newTopic
}