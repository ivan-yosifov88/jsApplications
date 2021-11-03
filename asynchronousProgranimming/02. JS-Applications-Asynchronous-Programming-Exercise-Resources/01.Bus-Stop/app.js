function getInfo() {
    const busStopId = document.querySelector('#stopId');
    const url = `http://localhost:3030/jsonstore/bus/businfo/${busStopId.value}`;
    const stopName = document.querySelector('#stopName');
    const busList = document.querySelector('#buses');
    
    busStopId.value = '';

    fetch(url)
        .then(response => {
            if (response.ok == false) {
                return "Error";
            };
            return response.json();
        })
        .then(responseHandler)
        .catch(error => {
            busList.innerHTML = '';
            stopName.textContent = 'Error';
        })


    function responseHandler(data) {
        busList.innerHTML = '';
        stopName.textContent = data.name
        for (let busId in data.buses) {
            let busInfo = document.createElement('li');
            let time = data.buses[busId];
            busInfo.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busList.appendChild(busInfo)
        }
    }
}