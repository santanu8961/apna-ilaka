$('document').ready(function () {
    $('#signup').on('click', function () {
        var data = {
            email: $('#email').val(),
            password: $('#password').val(),
            username: $('#username').val(),
            confirm_password: $('#confirm_password').val(),
            name: $('#name').val()
        }

        if (data.password && data.email && data.password && data.name) {
            if (data.password == data.confirm_password) {
                delete data.confirm_password;
                $.ajax({
                    type: "POST",
                    url: "/signup_service",
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        console.log(response)
                        if(response.success == 1){
                            alert(response.info);
                            location.href = `/login`;
                        }else{
                            alert(response.info)
                        }
                    }
                });
            } else {
                alert('passwords bot matched! please try again')
            }
        } else {
            alert('Please provide valid information')
        }
    })

})