// console.log("Hello.");
// setTimeout(function() {
//   console.log("Goodbye!1");
// }, 2000);
// setTimeout(function() {
//       console.log("Goodbye!2");
//     }, 4000);
// setTimeout(function() {
//       console.log("Goodbye!3");
//     }, 2000);
// console.log("Hello again!");


// console.log('Before promise');

// new Promise(function (resolve, reject) {
//     setTimeout(function () {
//         reject('fail');
//     }, 500);
// })
//     .then(function (res) {
//     console.log('Then returned: ' + res);
//     })
//     .catch(function (error) {
//         console.log('Then returned: ' + error)
//     } )
// console.log('After promise');

//Work only in browser this way
// fetch('https://api.github.com/users/testnakov/repos')
//   .then((response) => response.json())
//   .then((data) => console.log (data))
//   .catch((error) => console.error(error))
function addInfo (){
    const addButton = document.querySelector('#add-btn');
    const resultDiv = document.querySelector('#res');
    addButton.addEventListener('click', function(){
        let resultFetch = fetch('https://api.github.com/users/testnakov/repos')
        console.log(resultFetch)
    })
    

}