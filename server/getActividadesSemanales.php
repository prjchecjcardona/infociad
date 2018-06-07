<?php

require 'lib.php';

$api = new InfoApi();

if (isset($_POST['anio']) && $_POST['anio'] != -1) {
    $anio = $_POST['anio'];
} else {
    $anio = null;
}

if (isset($_POST['mes']) && $_POST['mes'] != -1) {
    $mes = $_POST['mes'];
} else {
    $mes = null;
}

if (isset($_POST['idproyecto']) && $_POST['idproyecto'] != -1) {
    $proyecto = $_POST['idproyecto'];
} else {
    $proyecto = null;
}

if (isset($_POST['idbloque']) && $_POST['idbloque'] != -1) {
    $bloque = $_POST['idbloque'];
} else {
    $bloque = null;
}

if (isset($_POST['idobjetivo']) && $_POST['idobjetivo'] != -1) {
    $objetivo = $_POST['idobjetivo'];
} else {
    $objetivo = null;
}

if (isset($_POST['idproducto']) && $_POST['idproducto'] != -1) {
    $producto = $_POST['idproducto'];
} else {
    $producto = null;
}

$json = $api->getRegistroSemanal($anio, $mes, $proyecto, $bloque, $objetivo, $producto);

echo json_encode($json);
