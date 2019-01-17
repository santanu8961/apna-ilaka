$('document').ready(function () {
    $('#signup').on('click', function () {
        var data = {
            email: $('#email').val(),
            password: $('#password').val()
        }
console.log(`test`)
        if (data.password && data.email) {
            console.log(`im here`);
                $.ajax({
                    type: "POST",
                    url: "/login_service",
                    data: data,
                    dataType: "JSON",
                }).done( function (response) {
                    console.log(response)
                    if(response.passed == 1){
                        location.href = `/timeline`;
                    }else if(response.passed == 0){
                        alert(`User does not exist`);
                    }
                })
           
        }else{
            alert('please enter email and password both')
        }
    })

})