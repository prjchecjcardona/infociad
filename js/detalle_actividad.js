$(document).ready(function () {
    cargarProyecto();
    cargarBloque(1);
    $('#bloqueSelect').change(function () {
        $('objetivoSelect').empty()
        var selected = $('#bloqueSelect option:selected').attr("value")
        cargarObjetivo(selected)

    });

});

function cargarProyecto() {
    $.ajax({
        type: "get",
        url: "server/getProyectos.php",
        dataType: "json",
        success: function (response) {
            if (response.length == 0) {
                swal("ERROR APAA!")
            } else {
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
            if (response.length == 0) {
                swal("ERROR APAA!")
            } else {
                response.forEach(element => {
                    $('#bloqueSelect').append(`
                    <option value=${element.idbloque}>${element.nombre}</option>
                    `)

                });
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
                swal("ERROR APA")
            } else {
                response.forEach(element => {
                    $('#objetivoSelect').append(`
                    <option value=${element.idbloque}>${element.nombre}</option>
                    `)
                });
            }

        }
    });

}



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})