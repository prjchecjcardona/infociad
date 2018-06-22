$(document).ready(function () {
    cargarNombre();
    validarSesion();
    cargarProyecto();
    cargarBloque(1);
    cargarActividadSemanal();
    $('[data-toggle="tooltip"]').tooltip()

    $('#logoutButton').click(function () {
        logout()
    });


    $('#proyectoSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })

    $('#bloqueSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })

    $('#objetivoSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })

    $('#productoSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })

    $('#anoSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })

    $('#mesSelect').change(function () {
        $('#tablaActividadSemanal').empty();
        cargarActividadSemanal()
    })
});

function asignarEventoBloque() {
    $('#bloqueSelect').change(function () {
        $('#objetivoSelect').empty()
        $('#productoSelect').empty()
        $('#listaDetalleActividad').empty()
        $("#objetivoSelect").replaceWith(`<div class="sk-circle" id="objetivoLoader">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
    </div>`);
        cargarActividadSemanal()

        var selected = $('#bloqueSelect option:selected').attr("value")
        cargarObjetivo(selected)

    });
}

function asignarEventoObjetivo() {
    $('#objetivoSelect').change(function () {
        $('#productoSelect').empty()
        $('#listaDetalleActividad').empty()
        $("#productoSelect").replaceWith(`<div class="sk-circle" id="productoLoader">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
        </div>`);
        cargarActividadSemanal()

        var selected = $('#objetivoSelect option:selected').attr("value")
        cargarProducto(selected)

    });
}

function asignarEventoProducto() {

    $('#productoSelect').change(function () {
        $('#listaDetalleActividad').empty()
        $("#listaDetalleActividad").replaceWith(`<div class="sk-circle" id="detalleActividadLoader">
        <div class="sk-circle1 sk-child"></div>
        <div class="sk-circle2 sk-child"></div>
        <div class="sk-circle3 sk-child"></div>
        <div class="sk-circle4 sk-child"></div>
        <div class="sk-circle5 sk-child"></div>
        <div class="sk-circle6 sk-child"></div>
        <div class="sk-circle7 sk-child"></div>
        <div class="sk-circle8 sk-child"></div>
        <div class="sk-circle9 sk-child"></div>
        <div class="sk-circle10 sk-child"></div>
        <div class="sk-circle11 sk-child"></div>
        <div class="sk-circle12 sk-child"></div>
        </div>`);
        cargarActividadSemanal()

    });

}

function cargarProyecto() {
    $.ajax({
        type: "get",
        url: "server/getProyectos.php",
        dataType: "json",
        success: function (response) {


            if (response.length == 0) {
                swal("ERROR HAMIJO!")
            } else {
                $("#proyectoLoader").replaceWith(`
    <select class="form-control selector" id="proyectoSelect"></select>
    `);

                $('#proyectoSelect').append(`
                    <option value="-1">Selecciona...</option>
                    `)
                response.forEach(element => {
                    $('#proyectoSelect').append(`
                    <option value=${element.idproyecto}>${element.nombre}</option>
                    `)
                });
            }
        }
    });
}

function cargarBloque(idproyecto) {

    var data = {
        fk_campo: "proyecto_fk",
        fk_id: idproyecto
    }

    $.ajax({
        type: "get",
        url: "server/getBloques.php",
        data: data,
        dataType: "json",
        success: function (response) {

            $('#bloqueSelect').removeAttr("disabled");
            if (response.length == 0) {
                swal({
                    title: '¡Ups!',
                    text: 'No hay Bloques para este Proyecto',
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entiendo',
                    closeOnConfirm: false
                }, );
            } else {
                $("#bloqueLoader").replaceWith(`
                <select class="form-control selector" id="bloqueSelect"></select>
                `);
                $('#bloqueSelect').append(`
                    <option value="-1">Selecciona...</option>
                    `)
                response.forEach(element => {
                    $('#bloqueSelect').append(`
                    <option value=${element.idbloque}>${element.nombre}</option>
                    `)

                });
                asignarEventoBloque();
            }
        }
    });
}

function cargarObjetivo(idbloque) {
    var data = {
        fk_campo: "bloque_fk",
        fk_id: idbloque
    }
    $.ajax({
        type: "get",
        url: "server/getObjetivos.php",
        data: data,
        dataType: "json",
        success: function (response) {
            $('#objetivoSelect').removeAttr("disabled");
            if (response.length == 0) {
                swal({
                    title: '¡Ups!',
                    text: 'No hay Objetivos para este Bloque',
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entiendo',
                    closeOnConfirm: false
                }, );
            } else {
                $("#objetivoLoader").replaceWith(`<select class="form-control selector" id="objetivoSelect">
                </select>`);
                $('#objetivoSelect').append(`
                    <option value="-1">Selecciona...</option>
                    `)
                response.forEach(element => {
                    $('#objetivoSelect').append(`
                    <option value=${element.idobjetivo}>${element.nombre}</option>
                    `)
                });
                asignarEventoObjetivo();
            }
        }
    });

}

function cargarProducto(idobjetivo) {
    var data = {
        fk_campo: "objetivo_fk",
        fk_id: idobjetivo
    }
    $.ajax({
        type: "get",
        url: "server/getProductos.php",
        data: data,
        dataType: "json",
        success: function (response) {
            $('#productoSelect').removeAttr("disabled");
            if (response.length == 0) {
                swal({
                    title: '¡Ups!',
                    text: 'No hay Productos para este Objetivo',
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entiendo',
                    closeOnConfirm: false
                }, );
            } else {
                $("#productoLoader").replaceWith(`<select class="form-control selector" id="productoSelect">
                </select>`);
                $('#productoSelect').append(`
                    <option value="-1">Selecciona...</option>
                    `)
                response.forEach(element => {
                    $('#productoSelect').append(`
                    <option value=${element.idproducto}>${element.nombre}</option>
                    `)
                });
                asignarEventoProducto();
            }
        }
    });
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function habilitarCamposRegistro() {

    $('#tituloRegistro').removeAttr('disabled');
    $('#descripcionRegistro').removeAttr('disabled');

}

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

/* function cargarBitacora(idproducto) {
    var data = {
        fk_campo: "producto_fk",
        fk_id: idproducto
    }
    $.ajax({
        type: "get",
        url: "server/getBitacora.php",
        data: data,
        dataType: "json",
        success: function (response) {
            response.forEach(element => {
                $('#tablaBitacora').append(`
                <tr>
                    <th scope="row">${element.idbitacora}</th>
                    <td>${element.titulo}</td>
                    <td>${element.fecha}</td>
                    <td>${element.descripcion}</td>
                </tr>
                `)

            });

        }
    });
} */


function cargarActividadSemanal() {

    var data = {
        anio: $('#anoSelect option:selected').attr("value"),
        mes: $('#mesSelect option:selected').attr("value"),
        idproyecto: $('#proyectoSelect option:selected').attr("value"),
        idbloque: $('#bloqueSelect option:selected').attr("value"),
        idobjetivo: $('#objetivoSelect option:selected').attr("value"),
        idproducto: $('#productoSelect option:selected').attr("value")
    }

    $.ajax({
        type: "post",
        url: "server/getActividadesSemanales.php",
        data: data,
        dataType: "json",
        success: function (response) {

            $('#tablaActividadSemanal').empty();
            response.forEach(element => {
                $('#tablaActividadSemanal').append(`
                <tr>
                    <td>${element.nombre_bloque}</td>
                    <td>${element.nombre_objetivo}</td>
                    <td>${element.nombre_producto}</td>
                    <td>${element.fecha}</td>
                    <td>${element.nombre_detalle_actividad}</td>
                    <td>${element.descripcion_actividad_semanal}</td>
                </tr>
                `)

            });

        }
    });
}