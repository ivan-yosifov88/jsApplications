import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns as townsNames} from './towns.js';

const towns = townsNames.map(town => ({name: town, match: false}));

const root = document.querySelector('#towns');

const inputField = document.querySelector('#searchText');
const resultField = document.querySelector('#result')
const searchButton = document.querySelector('#search-button');
searchButton.addEventListener('click', onSearch);

const townList = (towns) => html`
 <ul>
    ${towns.map(town => html`<li class=${town.match ? "active": ""}>${town.name}</li>`)}
</ul>`;

render(townList(towns), root)

function onSearch(){
   
   let input = inputField.value.trim().toLowerCase();
   let matches = 0;
   towns.forEach(town => {
      if (input && town.name.toLocaleLowerCase().includes(input)){
         matches ++;
         town.match = true
      }else{
         town.match = false
      }
   })
   resultField.textContent = `${matches} matches found`

   render(townList(towns), root)
}
