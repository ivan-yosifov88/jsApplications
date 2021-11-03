function loadRepos() {
	const usernameInput = document.querySelector('#username');
	const reposSection = document.querySelector('#repos');
	const url = `https://api.github.com/users/${usernameInput.value}/repos`;
	fetch(url)
	.then(response => {
	if (response.ok == false){
		throw new Error(`${response.status} ${response.statusText}`);
	}
	return response.json();
	})
	.then(dataHandler)
	.catch(dataErrorHandler)
	
	function dataHandler(data){
		// reposSection.innerHtml = '';
		let section = Array.from(reposSection.querySelectorAll('li')).forEach(li => li.remove());
		data.forEach(item => {
			const liElement = createElement('li', {},
			createElement('a', {href : item.html_url}, item.full_name))
			reposSection.appendChild(liElement)
		})
	}
	function dataErrorHandler(error){
		reposSection.innerHTML = '';
		reposSection.textContent = `${error.message}`
	}
	function createElement(type, attributes, ...content){
		const newElement = document.createElement(type);
		for (let property in attributes){
			newElement[property] = attributes[property];
		};
		for (let item of content){
			if (typeof item == 'string' || typeof item == "number"){
				item = document.createTextNode(item)
			}
			newElement.appendChild(item);
		}
		return newElement
	}
}