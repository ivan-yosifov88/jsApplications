
import helperFunctions from "./helpers .js";
import days from "./pages/days.js";
import months from "./pages/months.js";
import years from "./pages/years.js";

setup()

//I did it very difficult! I had to make a logic to go to previous page with reference, but the app work.
function setup(){
    const mainElement = document.querySelector('body');
    const allSections = document.querySelectorAll('body > section');
    years.setupView(document.querySelector('.yearsCalendar'), mainElement);
    months.setupView(document.querySelectorAll('.monthCalendar'),mainElement);
    days.setupView(document.querySelectorAll('.daysCalendar'), mainElement);
    
    
    helperFunctions.removeAllSections(allSections)
    mainElement.appendChild(years.loadVIew())
    // months.loadVIew().forEach(view => mainElement.appendChild(view))

}

