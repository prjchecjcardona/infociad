<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require 'consultas.php';

class InfoApi
{
    private $con;

    public function __construct()
    {
        $this->connectDB();
    }

    public function connectDB()
    {
        //DB DATA
        $database = "d7jmsqb0pb9n11";
        $uid = "ymuglgckigeyxm";
        $pwd = "8a86f637e663ed9f778e1ec74e3da85d6f6aec7ce57dbbd2cf3c5c82afa3380a";
        $host = "ec2-184-73-201-79.compute-1.amazonaws.com";

        //establecer la conexión
        $this->con = new PDO("pgsql:host=$host;port=5432;dbname=$database;user=$uid;password=$pwd");
        if (!$this->con) {
            die('error de conexión');
        }
    }

    public function login($usr, $pwd)
    {
        return logQuery($this->con, $usr, $pwd);
    }
}
