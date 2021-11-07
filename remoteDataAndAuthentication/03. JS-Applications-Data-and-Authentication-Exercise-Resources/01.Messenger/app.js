function attachEvents() {

  const baseUrl = 'http://localhost:3030/jsonstore/messenger';

  const textArea = document.querySelector('#messages');
  const authorNameInput = document.querySelector('input[name="author"]');
  const messageInput = document.querySelector('input[name="content"]');

  const sendButton = document.querySelector('#submit');
  sendButton.addEventListener('click', sendMessage)

  const refreshButton = document.querySelector('#refresh');
  refreshButton.addEventListener('click', getAllMessagesInfo)


  async function sendMessage() {
    let authorName = authorNameInput.value.trim();
    let messageText = messageInput.value.trim();
    const data = {
      author: authorName,
      content: messageText,
    }
    try {
      const request = await fetch(baseUrl, {
        method: 'post',
        headers: {
          'Content-type': 'applications/json'
        },
        body: JSON.stringify(data)
      })
    } catch (error) {
      alert(error.message)
    }
    clearInputFields()
  }
  async function getAllMessagesInfo() {
    textArea.disabled = '';
    try {
      const request = await fetch(baseUrl);
      const data = await request.json();
      Object.values(data).forEach(record => textArea.textContent += `${record.author}: ${record.content}\n`)
      textArea.disabled = 'true';
    } catch (error) {
      alert(error)
    }
  }
  function clearInputFields() {
    authorNameInput.value = '';
    messageInput.value = '';
    textArea.textContent = ''
  }
}

attachEvents();
