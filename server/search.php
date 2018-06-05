<?php

require 'lib.php';

$api = new InfoApi();

if (isset($_GET['search'])) {
    $json = $api->search($_GET['search']);
} else {
    $json = "Error en la recepción de los datos";
}

echo json_encode($json);
