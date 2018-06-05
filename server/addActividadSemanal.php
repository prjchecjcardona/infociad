<?php

require 'lib.php';


$api = new InfoApi();

if (isset($_POST['fecha'], $_POST['descripcion'], $_POST['idusuario'], $_POST['detalleactividad'])) {
    if(isset($_FILES['evidencias'])){
        $filesArray = reArrayFiles($_FILES['evidencias']);
        $json = $api->addActividadSemanal($_POST['fecha'], $_POST['descripcion'], $_POST['idusuario'], $_POST['detalleactividad'], $filesArray);
    }else {
        $json = $api->addActividadSemanal($_POST['fecha'], $_POST['descripcion'], $_POST['idusuario'], $_POST['detalleactividad'], null);
    }
} else {
    $json = "error, no se recibieron los datos correctos";
}



echo json_encode($json);


function reArrayFiles(&$file_post) {

    $file_ary = array();
    $file_count = count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; $i++) {
        foreach ($file_keys as $key) {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }

    return $file_ary;
}