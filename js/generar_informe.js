$(document).ready(function () {
    cargarResumenInforme();
});

function genPDF() {
    var imgLogoCiad = 'img/logo_ciad.png'
    var imgEncabezado = 'img/Encabezado.png'
    var imgPiePagina = 'img/pie_de_pagina.png'
    var doc = new jsPDF('p', 'mm', 'a4');
    // pagina 1
    doc.addFont('Arial', 'Arial', 'bold')
    doc.fromHTML($('#selector').get(0), 20, 20, {
        'width': 500
    });
    doc.addImage(imgEncabezado, 'png', 0, 0, 210, 25)
    doc.addImage(imgPiePagina, 'png', 0, 277, 210, 20)
    doc.setFontSize(28)
    doc.text(53, 205, 'INFORME DE AVANCE')
    doc.text(78, 217, 'MAYO 2018')
    doc.addImage(imgLogoCiad, 'png', 47, 75, 115, 115)

    // pagina 2
    doc.addPage();
    doc.addImage(imgEncabezado, 'png', 0, 0, 210, 25)
    doc.addImage(imgPiePagina, 'png', 0, 277, 210, 20)
    doc.save('Informe_Semanal_Mayo.pdf')
}


/* function cargarTablaActividad() {

    var data = {
        anio: 2018,
        mes: 6,
        idproyecto: -1,
        idbloque: -1,
        idobjetivo: -1,
        idproducto: -1
    }

    $.ajax({
        type: "post",
        url: "server/getInformeMensual.php",
        data: data,
        dataType: "json",
        success: function (response) {

            response.forEach(element => {
                $('#tablaInformeMensual').append(`
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
} */


$('#informeSemanal').click(function () {
    genPDF()

});

/* $(document).ready(function () {
    cargarTablaActividad()
}); */




function cargarResumenInforme() {

    $.ajax({
        type: "get",
        url: "server/informeResumenMes.php",
        dataType: "json",
        success: function (response) {
            response.forEach(element => {
                $('#cargaMes').append(`<th>% Avance ${element.mes}</th>`);
            });
        }
    });

    $.ajax({
        type: "get",
        url: "server/getProductos.php",
        dataType: "json",
        success: function (productos) {
            var productos = productos;
            $.ajax({
                type: "get",
                url: "server/informeResumen.php",
                dataType: "json",
                success: function (response) {
                    let auxClase = 0;
                    productos.forEach(productoActual => {
                        let i = 0;
                        response.forEach(element => {
                            if (productoActual.nombre == element.nombre_producto) {
                                if (i == 0) {
                                    auxClase++
                                    $('#tablaControlAvance').append(`
                                    <tr class="fila${auxClase}" >
                                    <td>${element.nombre_bloque}</td>
                                    <td>${element.nombre_objetivo}</td>
                                    <td>${element.nombre_producto}</td>
                                    <td>${element.porcentaje_avance}%</td>
                                </tr>`);
                                    i = 1;
                                } else {
                                    $('#tablaControlAvance tr.fila' + auxClase).append(`
                                <td>${element.porcentaje_avance}%</td>
                                `);
                                }
                            }

                        });
                    });
                }
            });
        }
    });
}