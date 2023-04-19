var searchInput = document.getElementById('searchBlog');
const result = document.querySelector('.result');

searchInput.addEventListener('keyup',function(){

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function(){
    var queryResult = []
    if(xhr.readyState == 4 && xhr.status == 200){

      var resultSearch = JSON.parse(xhr.responseText);

      resultSearch.forEach(e => {

        const element = '<li class="text-gray-600 dark:text-gray-400">'+ e.judul +'</li>';
        queryResult.push(element);

      })
      
      result.innerHTML = queryResult;
    }
  }

  xhr.open('POST' ,'/search?s='+ searchInput.value ,true);
  xhr.send();
    
});
