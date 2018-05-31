<?php

require 'lib.php';

$api = new InfoApi();

if(isset($_GET['fk_campo'])){
    $json = $api->get('bitacora', $_GET['fk_campo'], $_GET['fk_id']);
}else {
    $json = $api->get('bitacora', null, null);
}

echo json_encode($json);