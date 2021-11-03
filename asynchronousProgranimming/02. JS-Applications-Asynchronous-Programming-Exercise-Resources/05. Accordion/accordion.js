(async function solution() {
    const articlesListUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const baseArticlesDetailsUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';
    const mainDiv =document.querySelector('#main')

    const articlesResponse = await fetch(articlesListUrl);
    const articlesData = await articlesResponse.json()
    renderArticles(articlesData)

    function renderArticles(data){
        for (let article of data){
            let {_id, title} = article;
            createArticle(_id, title)
        }

    }
    function createArticle(_id, title){

        const articleDiv = document.createElement('div');
        articleDiv.setAttribute('class', "accordion");

        const headDiv = document.createElement('div');
        headDiv.setAttribute('class', "head");

        const articleSpan = document.createElement('span');
        articleSpan.textContent = title;

        const button = document.createElement('button');
        button.setAttribute('class', "button")
        button.setAttribute('id', _id);
        button.textContent = 'More';
        button.addEventListener('click', showMore);

        headDiv.appendChild(articleSpan);
        headDiv.appendChild(button);

        articleDiv.appendChild(headDiv)

        mainDiv.appendChild(articleDiv);
    
    }
    async function showMore(event){
        let button = event.target;
        let divAccordion = event.target.parentElement.parentElement;
        if (button.textContent == "More"){
            button.disabled = true;
            const response = await fetch (`${baseArticlesDetailsUrl}${button.id}`);
            const data = await response.json();
            renderParagraph(data, divAccordion);
            button.textContent = "Less";
            button.disabled = false;
            return
        }
        if (button.textContent == "Less"){
            button.disabled = '';
            button.textContent = "More"
            divAccordion.querySelector('.extra').remove()
            return
        }
    }
    function renderParagraph(data, divAccordion){
        const extraDiv = document.createElement('div');
        extraDiv.setAttribute('class', "extra");
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = data.content

        extraDiv.appendChild(paragraphElement)
        extraDiv.style.display = "block"
        divAccordion.appendChild(extraDiv)
    

    }
})()
