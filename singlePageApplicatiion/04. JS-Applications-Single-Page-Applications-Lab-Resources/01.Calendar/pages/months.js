
import helperFunctions from "../helpers .js";
import days from "./days.js";
import years from "./years.js";

let section = undefined;
let mainElement = undefined
let monthsInYear = helperFunctions.monthsInYear

function setupView(domElement, main){
    section = domElement
    mainElement = main
    section.forEach(element => {
        let currentYearBox = element.querySelector('caption');
        let currentMonthBox = element.querySelectorAll('td.day')
            .forEach(box => box.addEventListener('click', showDaysView))
        currentYearBox.addEventListener('click', showYearsView)
    })
}
function loadVIew(){
    return section
}

function showYearsView(){
    helperFunctions.removeAllSections(mainElement.querySelectorAll('section'))
    mainElement.appendChild(years.loadVIew())
}
function showDaysView(event){
    let currentElement = event.target
    let year = event.target.parentElement.parentElement.parentElement.caption.textContent
    let month = event.target.firstElementChild.textContent
    let currentDate = `month-${year}-${monthsInYear[month]}`
    let currentCalendarView = [...days.loadVIew()].find(view => view.id == currentDate)
    helperFunctions.removeAllSections(mainElement.querySelectorAll('section'))
    mainElement.appendChild(currentCalendarView)
}

let months = {
    setupView,
    loadVIew
}

export default months