function solve() {
    const baseUrl = `http://localhost:3030/jsonstore/bus/schedule/`
    const departButton = document.querySelector('#depart');
    const arriveButton = document.querySelector('#arrive');
    const infoBox = document.querySelector('#info .info');
    let currentStop = '';
    let nextStop = 'depot'

    function depart() {
        departButton.disabled = true;
        arriveButton.disabled = '';
        fetch(`${baseUrl}${nextStop}`)
        .then(response => {
            if (response.ok == false){
                throw new Error
            }
            return response.json();
        })
        .then(data => {
            infoBox.textContent = `Next stop ${data.name}`;
            currentStop = data.name
            nextStop = data.next
        })
        .catch(error => {
            infoBox.textContent = 'Error';
            arriveButton.disabled = true;
            departButton.disabled = true;
        })
    }

    function arrive() {
        arriveButton.disabled = true;
        departButton.disabled = '';
        infoBox.textContent = `Arriving at ${currentStop}`;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();