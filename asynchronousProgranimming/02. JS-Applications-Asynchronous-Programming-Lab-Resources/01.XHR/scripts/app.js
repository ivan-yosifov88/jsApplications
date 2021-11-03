function loadRepos() {
   const resultDivElement = document.querySelector('#res');
   let method = "GET"
   let url = 'https://api.github.com/users/testnakov/repos';
   httpRequest = new XMLHttpRequest();
   httpRequest.addEventListener('readystatechange', function(){
      if (httpRequest.readyState == 4){
         resultDivElement.textContent = httpRequest.responseText
      }
   });
   httpRequest.open(method, url);
   httpRequest.send();
}