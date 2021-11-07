const baseUrl = 'http://localhost:3030/jsonstore/collections/students';

const formElement = document.querySelector('#form');
formElement.addEventListener('submit', submitStudentInfo)

const tableTBody = document.querySelector('#results tbody');

async function submitStudentInfo(event) {
    event.preventDefault();
    // const inputFields = new FormData(formElement)
    const inputFields = new FormData(event.currentTarget)
    const firstName = inputFields.get('firstName')
    const lastName = inputFields.get('lastName')
    const facultyNumber = inputFields.get('facultyNumber')
    const grade = inputFields.get('grade')

    const data = {
        firstName,
        lastName,
        facultyNumber,
        grade,
    };
    const request = await fetch(baseUrl, {
        method: 'post',
        headers: { 'Content-type': 'applications/json' },
        body: JSON.stringify(data)
    })
    clearInputFields()
    clearTableBody()
    const newRequest = await fetch(baseUrl);
    const response = await newRequest.json();
    renderStudentData(response)
}
function clearInputFields() {
    formElement.reset()
}
function clearTableBody() {
    tableTBody.innerHTML = ''
}
function renderStudentData(data) {
    Object.values(data).forEach(record => {
        let tableRow = createTableRow(record.firstName, record.lastName, record.facultyNumber, record.grade)
        tableTBody.appendChild(tableRow)
    })
}
function createTableRow(...elements) {
    const tableRow = document.createElement('tr');
    elements.forEach(element => {
        let tdElement = document.createElement('td');
        tdElement.textContent = element
        tableRow.appendChild(tdElement)
    })
    return tableRow
}

