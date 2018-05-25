$(document).ready(function () {
    $('#enviarLogueo').click(function (e) {
        $('.sk-folding-cube').show();
        $('#formularioIngreso').hide();
        e.preventDefault();

        var data = {
            user: $('#username').val(),
            pwd: $('#password').val()

        };

        $.ajax({
            type: "post",
            url: "server/login.php",
            data: data,
            dataType: "json",
            success: function (response) {

                setTimeout(function () {
                    $('.sk-folding-cube').hide();
                    $('#formularioIngreso').show();

                }, 1000);
                if (response.length == 0) {
                    swal({
                        title: '¡Ups!',
                        text: 'Las credenciales ingresadas no son las correctas, por favor intenta de nuevo.',
                        type: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Entiendo',
                        closeOnConfirm: false
                    }, );
                } else {
                    if (response[0].tipo_usuario == "ciad") {
                        window.location.href = "dashboard_ciad.html"
                    } else {
                        window.location.href = "dashboard_chec.html"
                    }
                }
            }
        });

    })
})