$(document).ready(function () {
    validarSesion();
    cargarProyecto();
    cargarBloque(1);
    $('[data-toggle="tooltip"]').tooltip()

    $('#logoutButton').click(function () {
        logout()
    });

    $('#buttonSearch').click(function (e) {
        e.preventDefault();
        var busqueda = $('#inputSearch').val()
        buscar(busqueda)
    });

    //Ruta boton guardar otro registro
    $('#guardarOtroBoton').click(function () {
        var descripcion = $('#descripcionArea').val()
        var iddetalleactividad = $('.list-group-item-warning').attr("value")
        var archivo = document.getElementById("subirArchivo").files
        if ($('#checkboxBitacora').prop('checked')) {
            addActividadSemanal(descripcion, iddetalleactividad, 'guardarOtro', true, archivo);

        } else {
            addActividadSemanal(descripcion, iddetalleactividad, 'guardarOtro', false, archivo);

        }
    });

    //Ruta boton guardar y salir
    $('#guardarSalirBoton').click(function () {
        var descripcion = $('#descripcionArea').val()
        var iddetalleactividad = $('.list-group-item-warning').attr("value")
        var archivo = document.getElementById("subirArchivo").files
        if ($('#checkboxBitacora').prop('checked')) {
            addActividadSemanal(descripcion, iddetalleactividad, 'guardarSalir', true, archivo);

        } else {
            addActividadSemanal(descripcion, iddetalleactividad, 'guardarSalir', false, archivo);

        }
    });

    //Ruta boton cancelar
    $('#cancelarBoton').click(function () {
        window.location.href = "dashboard_ciad.html"
    });

    $('#checkboxBitacora').change(function () {
        if ($(this).prop('checked')) {
            $('#tituloBitacora').removeAttr("disabled");
        } else {
            $('#tituloBitacora').attr("disabled", "");
        }

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

        var selected = $('#productoSelect option:selected').attr("value")
        cargarDetalleActividad(selected)
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
    <select class="form-control selector custom-select" id="proyectoSelect"></select>
    `);

                $('#proyectoSelect').append(`
                    <option>Selecciona...</option>
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
                <select class="form-control selector custom-select" id="bloqueSelect"></select>
                `);
                $('#bloqueSelect').append(`
                    <option>Selecciona...</option>
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
                $("#objetivoLoader").replaceWith(`<select class="form-control selector custom-select" id="objetivoSelect">
                </select>`);
                $('#objetivoSelect').append(`
                    <option>Selecciona...</option>
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
                $("#productoLoader").replaceWith(`<select class="form-control selector custom-select" id="productoSelect">
                </select>`);
                $('#productoSelect').append(`
                    <option>Selecciona...</option>
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

function cargarDetalleActividad(idproducto) {
    var data = {
        fk_campo: "producto_fk",
        fk_id: idproducto
    }

    $.ajax({
        type: "get",
        url: "server/getDetalleActividad.php",
        data: data,
        dataType: "json",
        success: function (response) {
            $('#listaDetalleActividad').removeAttr("disabled");
            if (response.length == 0) {
                swal({
                    title: '¡Ups!',
                    text: 'No hay Detalle Actividad para para este Producto',
                    type: 'warning',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Entiendo',
                    closeOnConfirm: false
                }, );
            } else {
                $("#detalleActividadLoader").replaceWith(`<div class="list-group" id="listaDetalleActividad">
                </div>`);
                response.forEach(element => {
                    $('#listaDetalleActividad').append(`
                    <a href="#" class="list-group-item list-group-item-action list-group-item-success detalleActividadClick" value=${element.iddetalle_actividad}>${element.nombre}</a>
                    `)
                    $('.detalleActividadClick').click(function () {
                        $('.detalleActividadClick').removeClass('list-group-item-warning').addClass('list-group-item-success')
                        $(this).removeClass("list-group-item-success").addClass("list-group-item-warning")

                    });
                });

            }
        }
    });

}

function buscar(busqueda) {
    $('.resultadoBusqueda').empty()
    var data = {
        search: busqueda
    }
    if (busqueda != "") {
        $.ajax({
            type: "get",
            url: "server/search.php",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.length == 0) {
                    swal("No se encuentran resultados asociados a la búsqueda")
                } else {
                    response.forEach(element => {
                        $('.resultadoBusqueda').append(`
                    <a href="#" class="list-group-item list-group-item-action" idresultado=${element.id} type=${element.type}> ${element.type} - ${element.nombre}</a>
                    <span>${element.id}</span>
                    `)
                    });
                }
            }
        });
    }
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

function addActividadSemanal(descripcion, iddetalleactividad, guardarOtro, bitacora, archivo) {

    var fecha = formatDate(new Date())
    var idusuario = localStorage.getItem('idusuario')
    var formData = new FormData(document.getElementById("subirArchivos"));
    /* formData.append("fecha", fecha);
    formData.append("descripcion", descripcion);
    formData.append("idusuario", idusuario);
    formData.append("detalleactividad", iddetalleactividad);
    formData.append("evidencias", archivo); */

    var data = {
        fecha: fecha,
        descripcion: descripcion,
        idusuario: idusuario,
        detalleactividad: iddetalleactividad,
    }


    swal({
        title: '¿Estás seguro de guardar?',
        text: "",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, Guardar'
    }).then((result) => {
        if (result.value) {
            $('#listaDetalleActividad').hide();
            $('.cargaLoader').show();

            if (bitacora) {
                addBitacora();
            }
            $.ajax({
                type: "post",
                url: "server/addActividadSemanal.php",
                data: data,
                dataType: "json",
                success: function (response) {

                    $.ajax({
                        type: "post",
                        url: "server/addEvidenciasSemanal.php",
                        data: formData,
                        processData: false,
                        dataType: "json",
                        contentType: false,
                        success: function (response) {
                            if (Array.isArray(response)) {
                                $('.cargaLoader').hide();
                                swal(
                                    'Guardado',
                                    'El Registro ha sido guardado',
                                    'success'
                                ).then(() => {
                                    if (guardarOtro == 'guardarOtro') {
                                        location.reload(true)
                                    } else {
                                        window.location.href = "dashboard_ciad.html"
                                    }
                                })

                            } else {
                                swal({
                                    title: '¡Ups!',
                                    text: 'Hubo un error en la inserción del registro',
                                    type: 'warning',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Entiendo',
                                    closeOnConfirm: false
                                }, );

                            }
                        }
                    });


                }
            });
        }
    })


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

function addBitacora(guardarOtro) {

    var fecha = formatDate(new Date())

    var data = {
        titulo: $('#tituloBitacora').val(),
        fecha: fecha,
        descripcion: $('#descripcionArea').val(),
        producto_fk: $('#productoSelect option:selected').attr("value")
    }

    $.ajax({
        type: "post",
        url: "server/addBitacora.php",
        data: data,
        dataType: "json",
        success: function (response) {

        }
    });

}