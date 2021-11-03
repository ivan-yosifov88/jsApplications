function attachEvents() {
    const postsUrl = 'http://localhost:3030/jsonstore/blog/post';
    const baseCommentsUrl = 'http://localhost:3030/jsonstore/blog/comments';
    const selectMenu = document.querySelector('#posts');
    const loadPostsButton = document.querySelector('#btnLoadPosts');
    loadPostsButton.addEventListener("click", loadPosts);
    const viewPostsButton = document.querySelector('#btnViewPost')
    viewPostsButton.addEventListener("click", viewPosts);

    async function loadPosts(){
        let data = await makeRequest(postsUrl);
        for (let commentInfo in data){
            let {body, id, title} = data[commentInfo]
            selectMenu.appendChild(createPostOptions(id, title))
        }
    }
    async function makeRequest(url){
        try{
            const request = await fetch(url);
            if (request.status !== 200){
                throw new Error('Bad request');
            }
            const response = await request.json();
            return response;
        }catch(error){
            alert (error.message);
        }
        
    }
    function createPostOptions(id, title){
        const optionElement = document.createElement('option');
        optionElement.value = id;
        optionElement.textContent = title
        return optionElement
    }
    async function viewPosts(){
        let optionFromSelectMenu = document.querySelector('#posts');
        let currentId = optionFromSelectMenu.value
        let postRequest = await makeRequest(`${postsUrl}/${currentId}`)
        let commentsRequest = await makeRequest(baseCommentsUrl)
        try{
            await Promise.all([postRequest, commentsRequest])
        }catch(error){
            alert (error.message)
        }
        let comments = await getComments(commentsRequest, currentId)
        renderData(postRequest.body, comments, currentId)
    }
    function renderData(body, comments, id){
        const postBody = document.querySelector('#post-body');
        postBody.innerHTML = '';
        postBody.textContent = body;

        const postCommentsUl = document.querySelector('#post-comments');
        postCommentsUl.innerHTML = '';
        comments.forEach(comment=> {
            let liElement = document.createElement('li');
            liElement.setAttribute('id', id)
            liElement.textContent = comment
            postCommentsUl.appendChild(liElement)
        })
    }
    function getComments(commentsData, id){
        let commentsWithCurrentId = [];
        for (let comment in commentsData){
            let currentComment = commentsData[comment]
            if (currentComment.postId == id){
                commentsWithCurrentId.push(currentComment.text)
            }
        }
        return commentsWithCurrentId
    }

}   
attachEvents();