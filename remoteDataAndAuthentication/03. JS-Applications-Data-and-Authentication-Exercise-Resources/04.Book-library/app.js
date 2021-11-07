const form = document.querySelector('form');
form.addEventListener('submit', submitForm);

const baseBooksUrl = 'http://localhost:3030/jsonstore/collections/books';

loadAllBooks()

const bookListElement = document.querySelector('table tbody');
bookListElement.addEventListener('click', interactWithRecord);

const loadButton = document.querySelector('#loadBooks');
loadButton.addEventListener('click', loadAllBooks);


function submitForm(event){
    event.preventDefault();
    const inputFields = new FormData(event.currentTarget);
    if (isAllFieldsFilled(inputFields) == false){
        alert("Please fill all Inputs")
        event.currentTarget.reset()
        return
    }
    const title = inputFields.get('title');
    const author = inputFields.get('author');
    options = {
        method : 'post',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
            author,
            title
        })
    };
    event.currentTarget.reset()
    makeRequest(baseBooksUrl, options)
    
}
async function interactWithRecord(event){
    if (event.target.className == "edit"){
        editBookRecord(event.target)
    }else if (event.target.className == "delete"){
        deleteBookRecord(event.target)
    }
}
async function editBookRecord(button){
    const recordId = button.parentElement.dataset.id;
    const url = `${baseBooksUrl}/${recordId}`;
    const getOptions = {method: 'get'}
    const currentRecord = await makeRequest(url , getOptions)
    const { title, author , _id} = currentRecord
    const editForm  = createEditForm(title, author)
    form.replaceWith(editForm)
    editForm.addEventListener('submit',async (event) => {
        event.preventDefault();
        const inputFields = new FormData(event.currentTarget);
        if (isAllFieldsFilled(inputFields) == false){
            alert("Please fill all Inputs")
            event.currentTarget.reset()
            return
        }
        const newTitle = inputFields.get('title');
        const newAuthor = inputFields.get('author');
        // options = {
        //     method : 'put',
        //     body: JSON.stringify({
        //         author: newAuthor,
        //         title: newTitle,
        //         _id: recordId
        //     })
        // };
        currentRecord.author = newAuthor
        currentRecord.title = newTitle
        options = {
            method : 'put',
            body: JSON.stringify(currentRecord)
        };
        await makeRequest(url, options)
        editForm.replaceWith(form)
        loadAllBooks()
    });
}   
async function deleteBookRecord(button){
    const recordId = button.parentElement.dataset.id;
    const url = `${baseBooksUrl}/${recordId}`;
    const options = {method: "delete"}
    await makeRequest(url, options)
    loadAllBooks()
}
async function loadAllBooks(){
    const options = {method: 'get'};
    const result = await makeRequest(baseBooksUrl, options);
    const allRecords = Object.values(result);
    bookListElement.replaceChildren()
    allRecords.forEach(record => bookListElement.appendChild(createTableRow(record)));
}
async function makeRequest(url, options){
    try{
        const request = await fetch(url, options);
        if (request.ok == false){
            throw new Error('Bad request');
        }
        const data = await request.json();
        return data
    }catch(error){
        alert(error.message)
    }
}
function createTableRow(data){
    let {author, title, _id} = data;
    const newRow = document.createElement('tr');

    const titleTd = document.createElement('td');
    titleTd.textContent = title;
    const authorTd = document.createElement('td');
    authorTd.textContent = author;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = "edit"

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = "delete"

    newRow.appendChild(authorTd);
    newRow.appendChild(titleTd);
    newRow.appendChild(editButton);
    newRow.appendChild(deleteButton);
    newRow.setAttribute('data-id', _id)
    return newRow;
}
function createEditForm(title, author){
    const editForm = document.createElement('form');

    const heading = document.createElement('h3');
    heading.textContent = "Edit FORM";

    const titleLabel = document.createElement('label');
    titleLabel.textContent = "TITLE"

    const titleInputField = document.createElement('input');
    titleInputField.setAttribute('type', 'text');
    titleInputField.setAttribute('name', 'title')
    titleInputField.value = title

    const authorLabel = document.createElement('label');
    authorLabel.textContent = "AUTHOR";

    const authorInputField = document.createElement('input');
    authorInputField.setAttribute('type', 'text');
    authorInputField.setAttribute('name', 'author');
    authorInputField.value = author

    const saveButton = document.createElement('button');
    saveButton.textContent = "Save";

    editForm.appendChild(heading)
    editForm.appendChild(titleLabel)
    editForm.appendChild(titleInputField)
    editForm.appendChild(authorLabel)
    editForm.appendChild(authorInputField)
    editForm.appendChild(saveButton)


    return editForm
}
function isAllFieldsFilled(inputs){
    if ([...inputs.entries()].some(record => record[1] == '')){
        return false
    }
    return true
}
