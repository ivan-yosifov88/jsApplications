import { html, render } from './node_modules/lit-html/lit-html.js'


const root = document.querySelector('#root');

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    let towns = document.getElementById('towns').value.split(', ');
    render(townsList(towns), root);
};
let townsList = (towns) =>  html`
<ul>
    ${towns.map(town => html`<li>${town}</li>`)}
</ul>`;

