function attachEvents() {

    const baseUrl = 'http://localhost:3030/jsonstore/phonebook';

    const phoneBookList = document.querySelector('#phonebook');
    const personNameInput = document.querySelector('#person');
    const phoneNUmberInput = document.querySelector('#phone');

    const loadButton = document.querySelector('#btnLoad');
    loadButton.addEventListener('click', loadPhoneBook);

    const createButton = document.querySelector('#btnCreate');
    createButton.addEventListener('click', createRecord)

    async function loadPhoneBook() {
        let data = await getAllPhoneBookRecords();
        phoneBookList.innerHTML = ''
        data.forEach(record => {
            let liElement = document.createElement('li');
            liElement.textContent = `${record.person}: ${record.phone}`;
            liElement.setAttribute('class', record._id);
            let deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener('click', () => deleteCurrentRecord(liElement, record._id))
            liElement.appendChild(deleteButton);
            phoneBookList.appendChild(liElement)
        })

    }
    async function getAllPhoneBookRecords() {
        try {
            const request = await fetch(baseUrl);
            if (request.ok == false) {
                throw new Error('Bad Request')
            }
            const data = await request.json();
            return Object.values(data)
        } catch (error) {
            alert(error.message)
        }
    }
    async function deleteCurrentRecord(element, id) {
        try {
            const getRequest = await fetch(`${baseUrl}/${id}`);
            if (getRequest.status != 200){
                throw new Error ('Bad request.\nPlease load the phonebook')
            }
            const request = await fetch(`${baseUrl}/${id}`, {
                method: "delete"
            })
            if (request.ok == false) {
                throw new Error("Bad request")
            }
        } catch (error) {
            alert(error.message)
        }
    }
    async function createRecord() {
        const personName = personNameInput.value.trim();
        const phoneNumber = phoneNUmberInput.value.trim();
        const data = {
            "person": personName,
            "phone": phoneNumber
        }
        const request = await fetch(baseUrl, {
            method: "post",
            headers: { 'Content-type': 'applications/json' },
            body: JSON.stringify(data)
        })
        loadPhoneBook()
        clearInputFields()
    }
    function clearInputFields() {
        personNameInput.value = '';
        phoneNUmberInput.value = '';
    }

}

attachEvents();