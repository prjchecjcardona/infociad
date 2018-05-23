<?php

require 'lib.php';

$api = new InfoApi();
$usr = $_POST['user'];
$pwd = $_POST['pwd'];

if(isset($usr, $pwd)){
    $json = $api->login($usr, $pwd);
}

echo json_encode($json);