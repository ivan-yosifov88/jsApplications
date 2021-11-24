import { html, render } from './node_modules/lit-html/lit-html.js';

// import { until } from './node_modules/lit-html/directive.js'

const baseUrl = 'http://localhost:3030/jsonstore/advanced/table';

const tbody = document.querySelector('#tbody');

const inputField = document.querySelector('#searchField');

const searchButton = document.querySelector('#searchBtn');
searchButton.addEventListener('click', onClick);

const studentRecord = (student) => html`
<tr class="${student.match ? 'select' : ''}">
   <td>${student.firstName} ${student.lastName}</td>
   <td>${student.email}</td>
   <td>${student.course}</td>
</tr>`

let data;

getStudentData();


console.log(data)

async function getStudentData() {

   try {
      let request = await fetch(baseUrl)
      if (request.ok == false) {
         throw new Error(error.message)
      }
      let response = await request.json()
      data = Object.values(response)
      data.forEach(student => student.match = false)
      update()
      return response
   } catch (error) {
      return alert(error.message)
   }

}

function update() {
   render(data.map(studentRecord), tbody)
}

function onClick() {
   let input = inputField.value.trim().toLocaleLowerCase();

   for (let student of data) {
      Object.values(student).some(property => {
         if (typeof property != 'boolean'){
            if (property.toLocaleLowerCase().includes(input)){
               student.match = true
               return true
            }else {
               student.match = false
            }
         } 
         
      })
   }
   update()
   console.log(data)
}