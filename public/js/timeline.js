$(document).ready(function () {
    $('#createpost').on('click',function(){
        var post = CKEDITOR.instances['#status'].getData()

        var data = {
            username: $('#username').html(),
            name:$('#name').html(),
            email: $('#email').html(),
            post:post,
            
        };

        $.ajax({
            type: "POST",
            url: "/createpost",
            data: data,
            dataType: "JSON",
        }).done( function (response) {
            if(response.isUploaded){
                alert(`post uploaded succesfully`);
            }else{
                alert(`something Went Wrong`);
            }
            
        })
    })    
});