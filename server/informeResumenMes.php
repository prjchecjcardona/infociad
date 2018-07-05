<?php

require 'lib.php';
$api = new InfoApi();

$json = $api->informeResumenMes();

echo json_encode($json);
