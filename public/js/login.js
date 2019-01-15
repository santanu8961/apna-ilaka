$('document').ready(function () {
    $('#signup').on('click', function () {
        var data = {
            email: $('#email').val(),
            password: $('#password').val()
        }
console.log(`test`)
        if (data.password && data.email) {
                $.ajax({
                    type: "POST",
                    url: "/login_service",
                    data: data,
                    dataType: "JSON",
                    success: function (response) {
                        console.log(`response`,response);
                        // console.log(response)
                        if(response.passed == 1){
                            // alert(response.info);
                            localStorage.setItem("sessionKey", Math.random().toString(36).slice(2));
                            // location.href = `/login`;
                        }else{
                            alert(response)
                        }
                    }
                });
           
        }else{
            alert('please enter email and password both')
        }
    })

})