function loadCommits() {
    const usernameInput = document.querySelector('#username');
    const repoInput = document.querySelector('#repo');
    // const commitsSection = document.querySelector('#commits'); did not work in main flow only in asynchronous flow
    const url = `https://api.github.com/repos/${usernameInput.value}/${repoInput.value}/commits`;
    // async function makeRequest(){
    //     try{
    //         const response = await fetch(url);
    //         if (response.ok == false){
    //             throw new Error(`${response.status} (Not Found)`);
    //         }
    //         const data = await response.json();
    //         dataHandler(data)
    //     }catch(error){
    //         dataErrorHandler(error)
    //     }
    
       
    // }

    fetch(url)
        .then(response => {
        if (response.ok == false) {
            throw new Error(`${response.status} (Not Found)`);
        }
        return response.json();
        })
        .then(dataHandler)
        .catch(dataErrorHandler)

    function dataHandler(data) {
        const commitsSection = document.querySelector('#commits');
        commitsSection.innerHtml = '';
        data.forEach(item => {
            const liElement = document.createElement('li');
            liElement.textContent = `${item.author.login}: ${item.commit.message}`
            commitsSection.appendChild(liElement)
        })
    }
    function dataErrorHandler(error) {
        commitsSection.innerHTML = '';
        commitsSection.textContent = `${error.message}`
    }
}