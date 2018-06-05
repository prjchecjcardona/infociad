<?php

require 'lib.php';

$api = new InfoApi();

if (isset($_POST['anio'])) {
    $anio = $_POST['anio'];
}else {
    $anio = null;
}

if (isset($_POST['mes'])) {
    $mes = $_POST['mes'];
}else {
    $mes = null;
}

if (isset($_POST['idproyecto'])) {
    $proyecto = $_POST['idproyecto'];
}else {
    $proyecto = null;
}

if (isset($_POST['idbloque'])) {
    $bloque = $_POST['idbloque'];
}else {
    $bloque = null;
}

if (isset($_POST['idobjetivo'])) {
    $objetivo = $_POST['idobjetivo'];
}else {
    $objetivo = null;
}

if (isset($_POST['idproducto'])) {
    $producto = $_POST['idproducto'];
}else {
    $producto = null;
}

$json = $api->getRegistroSemanal($anio, $mes, $proyecto, $bloque, $objetivo, $producto);

echo json_encode($json);
