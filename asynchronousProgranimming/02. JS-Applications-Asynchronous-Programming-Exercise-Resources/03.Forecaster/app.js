function attachEvents() {
    const wetherSymbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: ' ☂',
    };
    const locationInput = document.querySelector('#location');
    const currentConditionsSection = document.querySelector('#current');
    const currentForecastSection = document.querySelector('#forecast')
    const upcomingForecastSection = document.querySelector('#upcoming');
    const submitBUtton = document.querySelector('#submit');
    submitBUtton.addEventListener('click', getWetherForecast);
    const baseLocationUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const todayForecastBaseUrl = 'http://localhost:3030/jsonstore/forecaster/today/'
    const upcomingForecastBaseUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/'
    function getWetherForecast() {
        fetch(baseLocationUrl)
            .then(response => {
                if (response.ok == false) {
                    throw new Error
                }
                return response.json();
            })
            .then(data => {
                let currentCity = data.find(city => city.name == locationInput.value);
                if (currentCity == undefined) {
                    throw new Error
                }
                fetch(`${todayForecastBaseUrl}${currentCity.code}`)
                    .then(response => {
                        if (response.ok == false) {
                            throw new Error
                        }
                        return response.json();
                    })
                    .then(data => {
                        clearDivFields(currentConditionsSection)
                        loadCurrentForecast(data)
                        fetch(`${upcomingForecastBaseUrl}${currentCity.code}`)
                            .then(response => {
                                if (response.ok == false) {
                                    throw new Error
                                }
                                return response.json();
                            })
                            .then(data => {
                                clearDivFields(upcomingForecastSection)
                                loadUpcomingForecast(data)
                                currentForecastSection.style.display = '';
                            })
                    })
            })
        .catch(error => {
            let ErrorDiv = createElement('div', {class: "label"}, "Error");
            clearDivFields(currentConditionsSection)
            clearDivFields(upcomingForecastSection)
            currentConditionsSection.appendChild(ErrorDiv);
            currentForecastSection.style.display = '';
        })

        function createElement(type, attributes, ...content) {
            let newElement = document.createElement(type);
            for (let property in attributes) {
                newElement.setAttribute(property, attributes[property])
            };
            for (let item of content) {
                if (typeof item == 'string' || typeof item == "number") {
                    item = document.createTextNode(item)
                }
                newElement.appendChild(item)
            }
            return newElement

        }
        function loadCurrentForecast(data) {
            let { forecast, name} = data;
            let { condition, high, low} = forecast;
            let conditionSymbol = wetherSymbols[condition];
            let temperatureInfo = `${low}°/${high}°`;
            const forecastDivElement = createElement('div', { class: "forecast"},
                createElement('span', { class: "condition symbol" }, conditionSymbol),
                createElement('span', { class: "condition" },
                    createElement('span', { class: "forecast-data" }, name),
                    createElement('span', { class: "forecast-data" }, temperatureInfo),
                    createElement('span', { class: "forecast-data" }, condition),
                )
            )
            currentConditionsSection.appendChild(forecastDivElement);
            

        }
        function loadUpcomingForecast(data){
            const forecastInfo = createElement('div', {class: "forecast-info"});
            let { forecast, name} = data;
            for (let day of forecast){
                let { condition, high, low } = day;
                let temperatureInfo = `${low}°/${high}°`;
                let conditionSymbol = wetherSymbols[condition];
                let upcomingForecastSpan = createElement('span', {class: "upcoming"}, 
                    createElement('span', {class: "symbol"}, conditionSymbol),
                    createElement('span', {class: "forecast-data"}, temperatureInfo),
                    createElement('span', {class: "forecast-data"}, name)
                )
                forecastInfo.appendChild(upcomingForecastSpan)
            }
            upcomingForecastSection.appendChild(forecastInfo)
        }
        function clearDivFields(divElement){
            Array.from(divElement.children).forEach((element, index) => {
                if (index != 0){
                    element.remove()
                }
            })
        }
    }

}

attachEvents();