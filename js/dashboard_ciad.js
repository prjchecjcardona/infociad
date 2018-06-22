$(document).ready(function () {
  var heightScreen = $(window).height(); // returns height of browser viewport
  $('.heightScreen').css("height", heightScreen - 74)
  cargarNombre();
  validarSesion();
  $('#logoutButton').click(function () {
    logout()
  });



  $('[data-toggle="tooltip"]').tooltip()
});


function validarSesion() {
  var data = {
    idusuario: localStorage.getItem('idusuario')
  }
  $.ajax({
    type: "post",
    url: "server/validateSession.php",
    data: data,
    dataType: "json",
    success: function (response) {
      if (!response) {
        swal(
          '¡Ay!',
          'Debes iniciar sesión primero',
          'error'
        ).then(() => {
          window.location.href = "login.html"
        })
      }
    }
  });

}

function logout() {

  $.ajax({
    type: "post",
    url: "server/logout.php",
    dataType: "json",
    success: function (response) {
      swal(
        '¡Enhorabuena!',
        'Haz cerrado sesión',
        'success'
      ).then(() => {
        window.location.href = "login.html"
      })
    }
  });

}

function cargarNombre() {

  var nombre = localStorage.getItem('nombre');
  $('#cargarNombre').html(nombre);

}