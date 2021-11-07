const loadButton = document.querySelector('.load');
loadButton.addEventListener('click', loadAllCatches);

const catchesUrl = 'http://localhost:3030/data/catches';

const catchesSection = document.querySelector('#catches');

loadAllCatches()

loggedUserConfiguration()

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', logoutUser)

const addForm = document.querySelector('#addForm');
addForm.addEventListener('submit', addNewCatch);




async function loadAllCatches() {
    try {
        let options = {
            method: "GET",
        };
        let response = await makeRequest(catchesUrl, options)
        renderCatchesView(response)
    } catch (error) {
        alert(error.message)
    }
};
async function addNewCatch(event) {
    event.preventDefault();
    const addFormData = new FormData(addForm);
    let data = {
        angler: addFormData.get("angler"),
        weight: addFormData.get("weight"),
        species: addFormData.get("species"),
        location: addFormData.get("location"),
        bait: addFormData.get("bait"),
        captureTime: addFormData.get("captureTime"),
    };
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    };
    data = await makeRequest(catchesUrl, options)
    appendCatchToCatchesSection(data)
};
async function updateRecord(event) {
    const recordId = event.target.id;
    const recordData = {};
    const url = `${catchesUrl}/${recordId}`;
    const divElement = event.target.parentElement;
    const allDivInputs = divElement.querySelectorAll('input');
    allDivInputs.forEach(input => recordData[input.className] = input.value)
    let data = {
        angler: recordData.angler,
        weight: recordData.weight,
        species:recordData.species,
        location: recordData.location,
        bait: recordData.bait,
        captureTime: recordData.captureTime,
    };
    let options = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    };
    await makeRequest(url, options)
    
};
async function deleteRecord(event) {
    const recordId = event.target.id;
    const currentRecord = event.target.parentElement;
    let options = {
        method: "DELETE",
        headers:{'X-Authorization': localStorage.getItem('token')}
    };
    const url = `${catchesUrl}/${recordId}`
    await makeRequest(url, options)
    currentRecord.remove()
};
async function logoutUser(event){
    event.preventDefault()
    const logoutUrl = 'http://localhost:3030/users/logout'
    let options = {
        method: "GET",
        headers:{'X-Authorization': localStorage.getItem('token')}
    };
    const request = await fetch(logoutUrl, options)
    if (request.status == 204){
        localStorage.clear()
        window.location.assign('./index.html')
    }
};


async function makeRequest(url, options) {
    const request = await fetch(url, options);
    if (request.status != 200) {
        throw new Error("Bad request!");
    }
    const data = await request.json();
    return data;
};

function createElement(type, attributes, ...content) {
    const newElement = document.createElement(type);

    for (let parameter in attributes) {
        newElement.setAttribute(parameter, attributes[parameter]);
    };
    for (let item of content) {
        if (typeof item == 'string' || typeof item == "number") {
            item = document.createTextNode(item);
        }
        newElement.appendChild(item);
    }
    return newElement
};
function createDivElement(data) {
    console.log(data)
    let { angler, weight, species, location, bait, captureTime, _ownerId, _id} = data;
    const divElement = createElement('div', { class: "catch" },
        createElement("label", {}, "Angler"),
        createElement('input', { type: "text", class: "angler", value: angler }),
        createElement("label", {}, "Weight"),
        createElement('input', { type: "text", class: "weight", value: weight }),
        createElement("label", {}, "Species"),
        createElement('input', { type: "text", class: "species", value: species }),
        createElement("label", {}, "Location"),
        createElement('input', { type: "text", class: "location", value: location }),
        createElement("label", {}, "Bait"),
        createElement('input', { type: "text", class: "bait", value: bait }),
        createElement("label", {}, "Capture Time"),
        createElement('input', { type: "text", class: "captureTime", value: captureTime }),
        createElement('button', { class: "update", "data-id": _ownerId , "id": _id}, "Update"),
        createElement('button', { class: "delete", "data-id": _ownerId , "id": _id}, "Delete")
    )
    addButtonsFunctionality(divElement)
    return divElement
};

function appendCatchToCatchesSection(data) {
    catchesSection.appendChild(createDivElement(data))
};
function renderCatchesView(catchesData) {

    document.querySelectorAll('.catch').forEach(record => record.remove())
    catchesData.forEach(record => catchesSection.appendChild(createDivElement(record)))
};
function addButtonsFunctionality(divElement,) {
    let updateButton = divElement.querySelector('.update')
    updateButton.addEventListener('click', updateRecord)
    disableButtonsWithDifferentId(updateButton)
    let deleteButton = divElement.querySelector('.delete')
    deleteButton.addEventListener('click', deleteRecord)
    disableButtonsWithDifferentId(deleteButton)
};
function disableButtonsWithDifferentId(button) {
    if (button.dataset.id == localStorage.getItem('id')) {
        button.disabled = false
    } else {
        button.disabled = true
    }
};
function loggedUserConfiguration(){
    changeAddButtonStatus()
    loadGreetingMessage()
};
function changeAddButtonStatus() {
    const addButton = document.querySelector('.add')
    if (localStorage.getItem('token') == null) {
        addButton.disabled = true
    } else {
        addButton.disabled = false
    }
};
function loadGreetingMessage(){
    if (localStorage.getItem('token') != null) {
        document.querySelector('.email span').textContent = `${localStorage.getItem('email')}`
    }else{
        document.querySelector('.email span').textContent = 'guest'
    }
}