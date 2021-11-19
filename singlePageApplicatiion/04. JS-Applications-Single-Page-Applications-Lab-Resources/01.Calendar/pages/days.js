import helperFunctions from "../helpers .js";
import months from "./months.js";

let section = undefined;
let mainElement = undefined

function setupView(domElement, main){
    section = domElement
    mainElement = main
    section.forEach(element => {
        let currentYearBox = element.querySelector('caption');
        currentYearBox.addEventListener('click', showMonthsView)
    });
}
function loadVIew(){
    return section
}
function showMonthsView(event){
    let [month, year] = event.target.textContent.split(' ');
    let date = `year-${year}`;
    let currentDate = [...months.loadVIew()].find(view => view.id == date)
    if (currentDate != undefined){
        helperFunctions.removeAllSections(mainElement.querySelectorAll('section'))
        mainElement.appendChild(currentDate)
    }

}

let days = {
    setupView,
    loadVIew
}

export default days