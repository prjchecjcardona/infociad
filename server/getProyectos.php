<?php

require 'lib.php';

$api = new InfoApi();

if (isset($_GET['fk_campo'])) {
    $json = $api->get('proyecto', $_GET['fk_campo'], $_GET['fk_id']);
} else {
    $json = $api->get('proyecto', null, null);
}

echo json_encode($json);
