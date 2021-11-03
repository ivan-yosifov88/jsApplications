window.addEventListener('DOMContentLoaded', async (event) => {
    const allRecipes = await getAllRecipesInfo()

    const mainSection = document.querySelector('main');
    renderRecipesView(allRecipes, mainSection)

})
async function getAllRecipesInfo() {
    const recipesUrl = 'http://localhost:3030/jsonstore/cookbook/recipes';
    try {
        const request = await fetch(recipesUrl);
        if (request.ok == false) {
            throw new Error('Bad Request')
        }
        const data = await request.json()
        return data
    } catch (error) {
        alert(error.message)
    }

}
function renderRecipesView(allRecipes, mainSection) {
    clearMainSection(mainSection)
    for (let obj in allRecipes) {
        let currentRecipe = allRecipes[obj]
        let { _id, name, img } = currentRecipe
        let article = createRecipesArticle(name, img, _id)
        article.addEventListener('click', () => loadRecipeContent(_id, article))
        mainSection.appendChild(article)
    }

}
function createRecipesArticle(name, img, _id) {
    const article = createElement('article', {class: "preview"},
        createElement('div', { class: "title" },
            createElement('h2', {}, name),
        createElement('div', { class: "small" },
            createElement('img', { src: img })
            )
        ),
    )
    // article.addEventListener('click', () => loadRecipeContent(_id))
    return article
}
function createElement(type, attributes, ...content) {
    const newElement = document.createElement(type);
    for (let property in attributes) {
        newElement.setAttribute(property, attributes[property]);
    };
    for (let item of content) {
        if (typeof item == 'string' || typeof item == "number") {
            item = document.createTextNode(item);
        }
        newElement.appendChild(item)
    }
    return newElement
}
function clearMainSection(mainSection) {
    mainSection.innerHTML = "";
}
async function loadRecipeContent(_id, article) {
    const currentRecipeUrl = 'http://localhost:3030/jsonstore/cookbook/details/' + _id;
    try {
        const request = await fetch(currentRecipeUrl);
        if (request.ok == false) {
            throw new Error("Bad Request")
        }
        const data = await request.json()
        let selectedArticle = createSelectRecipeArticle(Object.values(data))
        article.replaceWith(selectedArticle)
    } catch (error) {
        alert(error.message)
    }

}
function createSelectRecipeArticle(data) {
    [_id, name, img, ingredients, steps] = data
    let liElements = ingredients.map(ingredient => createElement('li', {}, ingredient));
    let pElements = steps.map(step => createElement('p', {}, step))
    const article = createElement('article', {},
        createElement('h2', {}, name),
        createElement('div', { class: "band" },
            createElement('div', { class: "thumb" },
                createElement('img', { src: img })
            ),
            createElement('div', { class: "ingredients" },
                createElement('h3', {}, "Ingredients:"),
                createElement('ul', {})
            )
        ),
        createElement('div', { class: "description" },
            createElement('h3', {}, "Preparation:"))
    )
    liElements.forEach(liElement => article.querySelector('.description').appendChild(liElement));
    pElements.forEach(pElement => article.querySelector('ul').appendChild(pElement));
    // article.addEventListener('click', () => closeSelectedArticle(data, article));
    return article;
}
// function closeSelectedArticle(data, selectedArticle){
//     [_id, name, img, ingredients, steps] = data;
//     let article = createRecipesArticle(name, img);
//     selectedArticle.replaceWith(article)
// }

