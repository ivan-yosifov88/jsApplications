
import helperFunctions from "../helpers .js";
import months from "./months.js";

let section = undefined;
let mainElement = undefined

function setupView(domElement, main, sections){
    section = domElement
    mainElement = main
    let tdElements = section.querySelectorAll('td')
    tdElements.forEach(td => td.addEventListener('click', showMonthSection))
}
function loadVIew(){
    return section
}

function showMonthSection(event){
    let selectedElement = event.target
    let selectedYear = selectedElement.querySelector('.date')
    let currentMonthsView = [...months.loadVIew()].find(section =>{
        let currentSection = section.id.split('-')[1];
        if (currentSection == selectedYear.textContent){
            return section
        }
    });
    if (currentMonthsView != undefined){
        helperFunctions.removeAllSections(mainElement.querySelectorAll('section'))
        mainElement.appendChild(currentMonthsView)
    }
}

let years = {
    setupView,
    loadVIew
}


export default years