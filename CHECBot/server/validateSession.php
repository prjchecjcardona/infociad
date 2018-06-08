<?php
session_start();
require 'lib.php';

$api = new InfoApi();
$idusr = $_POST['idusuario'];

if (isset($idusr)) {
    if (isset($_SESSION['idusuario']) && $_SESSION['idusuario'] == $idusr) {
        $json = true;
    } else {
        session_destroy();
        $json = false;
    }
}

echo json_encode($json);
