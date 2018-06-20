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

function getLastActividadSemanal($con){
    $sql = "SELECT MAX(idregistro_actividad_semanal) FROM registro_actividad_semanal";
    return executeQuery($con, $sql);
}

function getIdsEvidenciaName($con, $idRegistroActividad){
    $sql = "SELECT bl.idbloque, 
            ob.idobjetivo, 
            pr.idproducto, 
            da.iddetalle_actividad, 
            (SELECT EXTRACT(YEAR FROM ras.fecha) FROM registro_actividad_semanal ras where ras.idregistro_actividad_semanal = $idRegistroActividad) as anio,
            (SELECT EXTRACT(MONTH FROM ras.fecha) FROM registro_actividad_semanal ras where ras.idregistro_actividad_semanal = $idRegistroActividad) as mes
            FROM registro_actividad_semanal ras
            join detalle_actividad da on da.iddetalle_actividad = ras.detalle_actividad_fk
            join producto pr on pr.idproducto = da.producto_fk
            join objetivo ob on ob.idobjetivo = pr.objetivo_fk
            join bloque bl on bl.idbloque = ob.bloque_fk
            where ras.idregistro_actividad_semanal = $idRegistroActividad";
    return executeQuery($con, $sql);
}

function addEvidenciaQuery($con, $id_archivo, $nombre_archivo, $id_folder, $idRegistroActividadSemanal){
    $sql = "INSERT INTO evidencia_registro_actividad VALUES(nextval('evidencia_registro_actividad_sec'), '$id_archivo', '$nombre_archivo', '$id_folder', $idRegistroActividadSemanal)";
    return executeQuery($con, $sql);
}

function getQuery($con, $table, $fatherTable, $id_fk)
{
    if (!is_null($fatherTable)) {
        $sql = "SELECT * FROM $table WHERE $fatherTable = $id_fk ORDER BY id$table";
    } else {
        $sql = "SELECT * FROM $table ORDER BY id$table";
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

function getRegistroActividadSemanal($con, $anio, $mes, $proyecto, $bloque, $objetivo, $producto)
{
    if (is_null($anio) && is_null($mes) && is_null($proyecto) && is_null($bloque) && is_null($objetivo) && is_null($producto)) {
        $sql = "select ras.idregistro_actividad_semanal, ras.fecha,
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
        join proyecto pro on pro.idproyecto = bl.proyecto_fk";
    } else {
        $sql = "select ras.idregistro_actividad_semanal, ras.fecha,
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
        join proyecto pro on pro.idproyecto = bl.proyecto_fk
        WHERE ";
        $first=true;
        if(!is_null($anio)){
            if($first){
                $sql .= "(SELECT EXTRACT(YEAR FROM ras.fecha)) = $anio";
                $first = false;
            }else {
                $sql .= " AND (SELECT EXTRACT(YEAR FROM ras.fecha)) = $anio";
            }
        }
        if(!is_null($mes)){
            if($first){
                $sql .= "(SELECT EXTRACT(MONTH FROM ras.fecha)) = $mes";
                $first = false;
            }else {
                $sql .= " AND (SELECT EXTRACT(MONTH FROM ras.fecha)) = $mes";
            }
        }
        if(!is_null($proyecto)){
            if($first){
                $sql .= "pro.idproyecto = $proyecto";
                $first = false;
            }else {
                $sql .= " AND pro.idproyecto = $proyecto";
            }
        }
        if(!is_null($bloque)){
            if($first){
                $sql .= "bl.idbloque = $bloque";
                $first = false;
            }else {
                $sql .= " AND bl.idbloque = $bloque";
            }
        }
        if(!is_null($objetivo)){
            if($first){
                $sql .= "ob.idobjetivo = $objetivo";
                $first = false;
            }else {
                $sql .= " AND ob.idobjetivo = $objetivo";
            }
        }
        if(!is_null($producto)){
            if($first){
                $sql .= "pr.idproducto = $producto";
                $first = false;
            }else {
                $sql .= " AND pr.idproducto = $producto";
            }
        }



    }
    return executeQuery($con, $sql);
}

function addBitacoraQuery($con, $titulo, $fecha, $descripcion, $producto_fk)
{
    $sql = "INSERT INTO bitacora VALUES(nextval('bitacora_sec'), '$titulo', '$fecha', '$descripcion', $producto_fk)";
    return executeQuery($con, $sql);

}
