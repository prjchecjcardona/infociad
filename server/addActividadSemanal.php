<?php

require 'lib.php';

$api = new InfoApi();

if(isset($_POST['fecha'], $_POST['descripcion'], $_POST['idusuario'], $_POST['detalleactividad'])){
    $json = $api->addActividadSemanal($_POST['fecha'], $_POST['descripcion'], $_POST['idusuario'], $_POST['detalleactividad']);
}else{
    $json = "error, no se recibieron los datos correctos";
}

echo json_encode($json);