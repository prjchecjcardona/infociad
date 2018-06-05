<?php

function executeQuery($con, $sql)
{
    $result = $con->query($sql);
    if ($result) {
        $fetched_data = array();
        while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
            array_push($fetched_data, $row);
        }
        return $fetched_data;
    } else {
        return $con->errorInfo()[2];
    }
}

function logQuery($con, $usr, $pwd)
{
    $sql = "SELECT t.nombre AS tipo_usuario, u.idusuario, u.nombre FROM usuario u JOIN tipo_usuario t ON u.tipo_usuario_fk = t.idtipo_usuario WHERE u.email='$usr' AND u.contrasena='$pwd'";
    return executeQuery($con, $sql);
}

function actSemanalQuery($con, $fecha, $descripcion, $idusuario, $detalleactividad)
{
    $sql = "INSERT INTO registro_actividad_semanal VALUES(nextval('registro_actividad_semanal_sec'), '$fecha', '$descripcion', '$detalleactividad', $idusuario)";
    return executeQuery($con, $sql);
}

function getQuery($con, $table, $fatherTable, $id_fk)
{
    if (!is_null($fatherTable)) {
        $sql = "SELECT * FROM $table WHERE $fatherTable = $id_fk";
    } else {
        $sql = "SELECT * FROM $table";
    }
    return executeQuery($con, $sql);
}

function searchItemQuery($con, $keyword)
{
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



function cargaDetalleActividad($con, $table, $fatherTable, $id_fk)
{
    if (!is_null($fatherTable)) {
        $sql = "SELECT * FROM $table WHERE $fatherTable = $id_fk";
        $sql = "(select ras.idregistro_actividad_semanal, ras.fecha,
        ras.descripcion as descripcion_actividad_semanal,
        da.nombre as nombre_detalle_actividad,
        pr.nombre as nombre_producto,
        ob.nombre as nombre_objetivo,
        bl.nombre as nombre_bloque,
        pro.nombre as nombre_proyecto
    from registro_actividad_semanal ras
    join detalle_actividad da on da.iddetalle_actividad = ras.detalle_actividad_fk
    join producto pr on pr.idproducto = da.producto_fk
    join objetivo ob on ob.idobjetivo = pr.objetivo_fk
    join bloque bl on bl.idbloque = ob.bloque_fk
    join proyecto pro on pro.idproyecto = bl.proyecto_fk)";
    } else {
        $sql = "SELECT * FROM $table";
        $sql = "(select ras.idregistro_actividad_semanal, ras.fecha,
        ras.descripcion as descripcion_actividad_semanal,
        da.nombre as nombre_detalle_actividad,
        pr.nombre as nombre_producto,
        ob.nombre as nombre_objetivo,
        bl.nombre as nombre_bloque,
        pro.nombre as nombre_proyecto
    from registro_actividad_semanal ras
    join detalle_actividad da on da.iddetalle_actividad = ras.detalle_actividad_fk
    join producto pr on pr.idproducto = da.producto_fk
    join objetivo ob on ob.idobjetivo = pr.objetivo_fk
    join bloque bl on bl.idbloque = ob.bloque_fk
    join proyecto pro on pro.idproyecto = bl.proyecto_fk)";
    }
    return executeQuery($con, $sql);
}

function addBitacoraQuery($con, $titulo, $fecha, $descripcion, $producto_fk)
{
    $sql = "INSERT INTO bitacora VALUES(nextval('bitacora_sec'), '$titulo', '$fecha', '$descripcion', $producto_fk)";
    return executeQuery($con, $sql);

}
