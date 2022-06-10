(function($){
    
    //request db
    var xhr = new XMLHttpRequest();

    var name = sessionStorage.getItem('view');
    alert(name);
    //console.log(name);
    xhr.open('GET', './quickviews.php?name='+name);
    xhr.send(null);

    xhr.onreadystatechange = function(){
        if(xhr.readyState == xhr.DONE){

            var reponse = JSON.parse(xhr.responseText);
            
           console.log(reponse);
    
        }
    
        alert('done');
    }

})(jQuery);