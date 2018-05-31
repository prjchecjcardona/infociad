<?php

function executeQuery($con, $sql){
    if($con->query($sql)){
        $result = $con->query($sql);
        $fetched_data = array();
        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            array_push($fetched_data, $row);
        }
        return $fetched_data;
    }else{
        return $con->errorInfo()[2];
    }
}

function logQuery($con, $usr, $pwd){
    $sql = "SELECT t.nombre AS tipo_usuario, u.idusuario, u.nombre FROM usuario u JOIN tipo_usuario t ON u.tipo_usuario_fk = t.idtipo_usuario WHERE u.email='$usr' AND u.contrasena='$pwd'";
    return executeQuery($con, $sql);
}

function actSemanalQuery($con, $fecha, $descripcion, $idusuario, $detalleactividad){
    $sql = "INSERT INTO registro_actividad_semanal VALUES(nextval('registro_actividad_semanal_sec'), '$fecha', '$descripcion', '$detalleactividad', $idusuario)";
    return executeQuery($con, $sql);
}

function getQuery($con, $table, $fatherTable, $id_fk){
    if(!is_null($fatherTable)){
        $sql = "SELECT * FROM $table WHERE $fatherTable = $id_fk";
    }else{
        $sql = "SELECT * FROM $table";
    }
    return executeQuery($con, $sql);
}

function searchItemQuery($con, $keyword){
    $sql = "(select idproyecto as id, nombre, 'proyecto' as type from proyecto where UPPER(nombre) like UPPER('%$keyword%'))
    union all
    (select idbloque as id, nombre, 'bloque' as type from bloque where UPPER(nombre) like UPPER('%$keyword%'))
    union all
    (select idobjetivo as id, nombre, 'objetivo' as type from objetivo where UPPER(nombre) like UPPER('%$keyword%'))
    union all
    (select idproducto as id, nombre, 'producto' as type from producto where UPPER(nombre) like UPPER('%$keyword%'))
    union all
    (select iddetalle_actividad as id, nombre, 'detalle_actividad' as type from detalle_actividad where UPPER(nombre) like UPPER('%$keyword%'))";
    return executeQuery($con, $sql);
}

function addBitacoraQuery($con, $titulo, $fecha, $descripcion, $producto_fk){
    $sql = "INSERT INTO bitacora VALUES(nextval('bitacora_sec'), '$titulo', '$fecha', '$descripcion', $producto_fk)";
    return executeQuery($con, $sql);

}
