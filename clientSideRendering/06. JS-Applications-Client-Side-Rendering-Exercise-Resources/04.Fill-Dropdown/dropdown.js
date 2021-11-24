import { html, render } from './node_modules/lit-html/lit-html.js';

const baseUrl = 'http://localhost:3030/jsonstore/advanced/dropdown';
const rootDiv = document.querySelector('#root');
const form = document.querySelector('#form-input');
form.addEventListener('submit', addTown);

const selectMenu = (towns) => html `
<select>
    ${towns.map(town => html`<option .value ="${town._id}">${town.text}</option>`)}
</select>`;


addItem()



async function addItem() {
    let result = await getAllItems()
    render(selectMenu(Object.values(result)), rootDiv)

}

async function addTown(event){
    event.preventDefault()
    const textField = document.querySelector('#itemText').value.trim();
    await postNewItem(textField)
    let result = await getAllItems()
    render(selectMenu(Object.values(result)), rootDiv)
}

async function getAllItems(){
    try {
        let request = await fetch(baseUrl);
        if (request.ok == false) {
            throw new Error(error.message)
        }
        let response = await request.json()
        return response
    } catch (error) {
        return alert(error.message)
    }
}

async function postNewItem(text){
    let body = {
        text
    }
    let options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
    }
    try {
        let request = await fetch(baseUrl, options);
        if (request.ok == false) {
            throw new Error(error.message)
        }
        let response = await request.json()
        return response
    } catch (error) {
        return alert(error.message)
    }
}
