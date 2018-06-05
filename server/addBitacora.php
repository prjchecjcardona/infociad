<?php

require 'lib.php';

$api = new InfoApi();

if (isset($_POST['titulo'], $_POST['fecha'], $_POST['descripcion'], $_POST['producto_fk'])) {
    $json = $api->addRegistroBitacora($_POST['titulo'], $_POST['fecha'], $_POST['descripcion'], $_POST['producto_fk']);
} else {
    $json = "error, no se recibieron los datos correctos";
}

echo json_encode($json);
