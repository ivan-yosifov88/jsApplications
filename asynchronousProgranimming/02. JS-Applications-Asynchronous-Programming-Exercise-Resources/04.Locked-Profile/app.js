async function lockedProfile() {
    const profilesUrl = 'http://localhost:3030/jsonstore/advanced/profiles';
    const mainContent = document.querySelector('#main');
    try {
        const response = await fetch(profilesUrl);
        if (response.status !== 200){
            throw new Error
        }
        const data = await response.json();
        addLoadingMessage();
        renderCards(data);
    } catch (error) {
        renderErrorMessage()
    }
    function emptyDivContent() {
        mainContent.innerHTML = ''
    }
    function addLoadingMessage() {
        emptyDivContent();
        const loadingDivElement = createElement('div', {}, 'Loading...');
        mainContent.appendChild(loadingDivElement)
    }
    function createElement(type, attributes, ...content) {
        const newElement = document.createElement(type);
        for (let property in attributes) {
            newElement.setAttribute(property, attributes[property])
        };
        for (let item of content) {
            if (typeof item == 'string' || typeof item == 'number') {
                item = document.createTextNode(item)
            }
            newElement.appendChild(item)
        }
        return newElement
    }
    function renderCards(data) {
        emptyDivContent()
        let userIndex = 1
        for (let userId in data) {
            let { username, email, age } = data[userId];
            mainContent.appendChild(createProfileDiv(username, email, age, userIndex))
            userIndex ++

        }
    }
    function createProfileDiv(username, email, age, index) {
        const profileDiv = createElement('div', { class: "profile" },
            createElement('img', { src: "./iconProfile2.png",class: "userIcon"}),
            createElement('label', {}, "Lock"),
            createElement('input', { type: "radio", name: `user${index}Locked`, value: "lock", checked: true}),
            createElement('label', {}, "Unlock"),
            createElement('input', { type: "radio", name: `user${index}Locked`, value: "unlock" }),
            createElement('br', {}),
            createElement('hr', {}),
            createElement('label', {}, "Username"),
            createElement('input', { type: "text", name: `user${index}Username`, value: username, disabled: "", readonly: "" }),
            createElement('div', { id: "user1HiddenFields" },
                createElement('hr', {}),
                createElement('label', {}, "Email:"),
                createElement('input', { type: "email", name: `user${index}Email`, value: email, disabled: "", readonly: "" }),
                createElement('label', {}, "Age:"),
                createElement('input', { type: "age", name: `user${index}Age`, value: age, disabled: "", readonly: "" })
            ),
            createElement('button', {}, "Show More")
        )
        const moreButton = profileDiv.querySelector('button')
        moreButton.addEventListener('click', ShowMoreInfo)
        return profileDiv
    }
    function ShowMoreInfo(event){
        let button = event.target;
        let divElement = event.target.parentElement;
        let radioButton = divElement.querySelector('input[type="radio"][value="unlock"]');
        let hiddenField = divElement.querySelector('#user1HiddenFields');
        if (radioButton.checked){
            hiddenField.style.display = hiddenField.style.display == 'block' ? 'none' : 'block';
            button.textContent = button.textContent == "Show less" ? "Show more" : "Show less"
        }
    }
    function renderErrorMessage() {
        emptyDivContent()
        const errorDiv = createElement('div', {}, 'Error');
        mainContent.appendChild(errorDiv)
    }
}

