<?php

require 'lib.php';
$api = new InfoApi();

$json = $api->informeResumen();

echo json_encode($json);
