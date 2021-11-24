import { cats } from './catSeeder.js';
import { html, render } from './node_modules/lit-html/lit-html.js'




const root = document.querySelector('#allCats');
console.log(cats)

const catList = (cats) => html`
<ul>
    ${cats.map((cat) => html`
    <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button class="showBtn">Show status code</button>
            <div class="status" style="display: none" id="${cat.id}">
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`)}
</ul>   
`;
root.addEventListener('click', onClick);

function onClick(event) {
    if (event.target.tagName == "BUTTON") {
        let button = event.target
        let hiddenDiv = event.target.parentElement.querySelector('.status')
        if (hiddenDiv.style.display == 'block'){
            hiddenDiv.style.display = 'none';
            button.textContent = "Show status code"
        }else{ 
            hiddenDiv.style.display = 'block';
            button.textContent = "Hide status code"
        }
     }
}
render(catList(cats), root)
