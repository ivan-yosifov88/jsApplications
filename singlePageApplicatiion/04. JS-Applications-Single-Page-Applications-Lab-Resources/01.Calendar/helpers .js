function removeAllSections(elements){
    elements.forEach(section => section.remove())
}

let monthsInYear = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sept: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
}

let fullMonthsInYear = {
    January: 1,
    February: 2,
    March: 3,
    April: 4,
    May: 5,
    June: 6,
    July: 7,
    August: 8,
    September: 9,
    October: 10,
    November: 11,
    December: 12
}



let helperFunctions = {
    removeAllSections,
    monthsInYear,
    fullMonthsInYear
}
export default helperFunctions