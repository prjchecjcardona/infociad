# InfoCIAD API REST documentation


##Endpoint:
######/login.php

**@params: POST**
-user (string): nombre de usuario
-pwd (string): contraseña

**@returns:**
-array: 
    -Object: {tipo_usuario, idusuario, nombre} : Cuando el log es válido se arroja el tipo del usuario ingresado.
        Ejm: 
        [
            {
                "tipo_usuario": "ciad",
                "idusuario": 1,
                "nombre": "Juan Camilo Cardona Gutiérrez"
            }
        ]
    -Empty : Cuando el log no es válido se retorna un arreglo vacío
        Ejm: []


##Endpoint:
###/addActividadSemanal.php

**@params: POST**
-fecha (string): fecha de registro
-descripcion (string): descripcion de la actividad
-idusuario (integer) : id del usuaroi que hace el registro
-detalleactividad (integer) : id del detalle actividad al que va enlazado el registro

**@returns:**
-array: 
    -Object: {tipo_usuario, idusuario, nombre} : Cuando el log es válido se arroja el tipo del usuario ingresado.
        Ejm: 
        [
            {

            }
        ]
    -Empty : Cuando el log no es válido se retorna un arreglo vacío
        Ejm: []


##Endpoint:
###/getBloques.php

@params:GET
-[opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
-[opt]fk_id (integer): id del registro foráneo

**@returns:**
-array: 
    -Object: {idbloque, nombre, descripcion, proyecto_fk} : Cuando hay registros encontrados
        Ejm: 
        [
            {
                "idbloque": 1,
                "nombre": "ANALYTICS: Selección de aplicación para realizar analítica de sentimientos y emociones en diferentes canales como audio, chat, escrito- Dominio de cómo convertir las llamadas a watson - Speech analytcs - Aprendizaje de text analytics.",
                "descripcion": "|",
                "proyecto_fk": 1
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []


##Endpoint:
###/getObjetivos.php

**@params: GET**
-[opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
-[opt]fk_id (integer): id del registro foráneo

**@returns:**
-array: 
    -Object: {idobjetivo, nombre, descripcion, bloque_fk} : Cuando hay registros encontrados
        Ejm: 
        [
            {
                "idobjetivo": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "bloque_fk": 1
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []


##Endpoint:
###/getProductos.php

**@params: GET**
-[opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
-[opt]fk_id (integer): id del registro foráneo

**@returns:**
-array: 
    -Object: {idproducto, nombre, descripcion, objetivo_fk} : Cuando hay registros encontrados
        Ejm: 
        [
            {
                "idproducto": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "objetivo_fk": 1
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []


##Endpoint:
###/getProyectos.php

**@params: GET**
-[opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
-[opt]fk_id (integer): id del registro foráneo

**@returns:**
-array: 
    -Object: {idproyecto, nombre, descripcion, cliente_fk} : Cuando hay registros encontrados
        Ejm: 
        [
            {
                "idproyecto": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "cliente_fk": 1
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []


##Endpoint:
###/getDetalleActividad.php

**@params: GET**
-[opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
-[opt]fk_id (integer): id del registro foráneo

**@returns:**
-array: 
    -Object: {iddetalle_actividad, fecha_inicial_planeadas, fecha_final_planeadas, fecha_inicial_real, fecha_final_real, porcentaje_cumplimiento, ciclica, producto_fk} : Cuando hay registros encontrados
        Ejm: 
        [
            {
                "iddetalle_actividad": 1,
                "fecha_inicial_planeadas": "2018-05-20",
                "fecha_final_planeadas": "2018-05-20",
                "fecha_inicial_real": "2018-05-20",
                "fecha_final_real": "2018-05-20",
                "porcentaje_cumplimiento": 10,
                "ciclica": 1,
                "producto_fk": 2
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []


##Endpoint:
###/search.php

**@params: GET**
-search (string): palabra o palabras para buscar

**@returns:**
-array: 
    -Object: {id, nombre, type} : Cuando hay registros encontrados, se muestran todos los registros con su respectivo tipo que concuerdan con la búsqueda.
        Ejm: 
        [
            {
                "id": 80,
                "nombre": "6. Testing general, aplicación de pruebas de funcionalidad del chatbot",
                "type": "detalle_actividad"
            }
        ]
    -Empty : Cuando no hay registros
        Ejm: []