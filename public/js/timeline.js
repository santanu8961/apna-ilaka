$(document).ready(function () {
    $('.home').addClass('active');
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
    })  ;
    
    $('.add-like').on('click',function(){
        var self = this;
       var data = {
            post_id : $(this).closest('li').find('.post-id').html()
       };
       console.log(data);

       $.ajax({
        type: "POST",
        url: "/addlikes",
        data: data,
        dataType: "JSON",
    }).done( function (response) {
        console.log(response.likes.toString())
       $(self).closest('li').find('.like-number').html(response.likes.toString());
        
    });
    });


   
});