<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
require 'consultas.php';
include 'upload_GoogleDrive.php';

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

    public function addActividadSemanal($fecha, $descripcion, $idusuario, $detalleactividad, $evidencias)
    {
        //$dataInsert = actSemanalQuery($this->con, $fecha, $descripcion, $idusuario, $detalleactividad);
        if(is_null($evidencias)){
            return $dataInsert;
        }else{
            $idActividadSemanal = getLastActividadSemanal($this->con);
            $filesUpdated = $this->generateFileName($idActividadSemanal[0]['max'], $evidencias);
            $results = array();
            foreach ($filesUpdated as $file) {
                array_push($results, $this->addFileActividadSemanal($file, $idActividadSemanal[0]['max']));
            }
            return array();
        }
    }

    public function addFileActividadSemanal($file, $idActividadSemanal){
        $drive = new GoogleDrive();
        $folderId = '1lxaN1usq-LuG8gjRYj7AFXz6xDwL9A2M';
        $fileId = $drive->processFile($file['file'], $folderId, $file['newName']);
        return addEvidenciaQuery($this->con, $fileId, $file['newName'], $folderId, $idActividadSemanal);
    }

    public function generateFileName($idActividadSemanal, $evidencias){
        $idsEvidencia = getIdsEvidenciaName($this->con, $idActividadSemanal);
        $filesAndNames = array();
        $i = 0;
        foreach ($evidencias as $file) {
            $tmp = explode('.', $file['name']);
            $extension = end($tmp);
            $i++;
            array_push($filesAndNames, array(
                'file'=>$file,
                'newName'=> "B".$idsEvidencia[0]['idbloque']."-O".$idsEvidencia[0]['idobjetivo']."-P".$idsEvidencia[0]['idproducto']."-A".$idsEvidencia[0]['iddetalle_actividad']."-".$idsEvidencia[0]['anio']."-".$idsEvidencia[0]['mes']."-E".$i.".".$extension
            ));
        }
        return $filesAndNames;
    }

    public function get($table, $fatherTable, $id_fk)
    {
        if (!is_null($fatherTable)) {
            return getQuery($this->con, $table, $fatherTable, $id_fk);
        } else {
            return getQuery($this->con, $table, null, null);
        }
    }

    public function search($keyword)
    {
        return searchItemQuery($this->con, $keyword);
    }

    public function addRegistroBitacora($titulo, $fecha, $descripcion, $producto_fk)
    {
        return addBitacoraQuery($this->con, $titulo, $fecha, $descripcion, $producto_fk);
    }

    public function getRegistroSemanal($anio, $mes, $proyecto, $bloque, $objetivo, $producto){
        return getRegistroActividadSemanal($this->con, $anio, $mes, $proyecto, $bloque, $objetivo, $producto);
    }

    

}
