# InfoCIAD API REST documentation



## /login.php

**@params: POST**
* user (string): nombre de usuario
* pwd (string): contraseña

**@returns:**
* array: 
    * Object: {tipo_usuario, idusuario, nombre} : Cuando el log es válido se arroja el tipo del usuario ingresado.
        * Ejm: 
        ```
            [
                {
                    "tipo_usuario": "ciad",
                    "idusuario": 1,
                    "nombre": "Juan Camilo Cardona Gutiérrez"
                }
            ]
        ```
    * Array : Cuando el log no es válido se retorna un arreglo vacío
        * Ejm: 
        ```
            []
        ```

## /logout.php

**@params: POST**
* Ninguno

**@returns:**
* true


## /validateSession.php

**@params: POST**
* idusuario (integer): id del usuario logueado.


**@returns:**
* array: 
    * true: Cuando se valida la sesión correctamente.

    * false : Cuando no se valida una sesión creada.



## /addActividadSemanal.php

**@params: POST**
* fecha (string): fecha de registro
* descripcion (string): descripcion de la actividad
* idusuario (integer) : id del usuaroi que hace el registro
* detalleactividad (integer) : id del detalle actividad al que va enlazado el registro

**@returns:**
* array: 
    * Array : Cuando la inserción es válida retorna un arreglo vacío
        * Ejm: 
        ```    
        []
        ```
    * String: Cuando ocurre algún error en la inserción retorna el detalle del error como string.
        * Ejm: 
        ```
        "ERROR:  invalid input syntax for type date: \"hola\"\nLINE 1:"
        ```



## /getBloques.php

@params:GET
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {idbloque, nombre, descripcion, proyecto_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "idbloque": 1,
                "nombre": "ANALYTICS: Selección de aplicación para realizar analítica de sentimientos y emociones en diferentes canales como audio, chat, escrito*  Dominio de cómo convertir las llamadas a watson *  Speech analytcs *  Aprendizaje de text analytics.",
                "descripcion": "|",
                "proyecto_fk": 1
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```



## /getObjetivos.php

**@params: GET**
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {idobjetivo, nombre, descripcion, bloque_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "idobjetivo": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "bloque_fk": 1
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```

## /addBitacora.php

**@params: POST**
* titulo (string): titulo del registro
* fecha (string): fecha de registro
* descripcion (string) : descripcion de la actividad
* producto_fk (integer) : id del producto al que va enlazado el registro

**@returns:**
* array: 
    * Array : Cuando la inserción es válida retorna un arreglo vacío
        * Ejm: 
        ```    
        []
        ```
    * String: Cuando ocurre algún error en la inserción retorna el detalle del error como string.
        * Ejm: 
        ```
        "ERROR:  invalid input syntax for type date: \"hola\"\nLINE 1:"
        ```



## /getBitacora.php

**@params: GET**
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {idbitacora, titulo, fecha, descripcion, producto_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "idbitacora": 1,
                "titulo": "abc.",
                "fecha": "|",
                "descripcion": "adc.",
                "producto_fk": 1,
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```


## /getProductos.php

**@params: GET**
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {idproducto, nombre, descripcion, objetivo_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "idproducto": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "objetivo_fk": 1
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```



## /getProyectos.php

**@params: GET**
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {idproyecto, nombre, descripcion, cliente_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "idproyecto": 1,
                "nombre": "abc.",
                "descripcion": "|",
                "cliente_fk": 1
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```



## /getDetalleActividad.php

**@params: GET**
* [opt]fk_campo (string): nombre del campo en la tabla que contiene la llave foranea
* [opt]fk_id (integer): id del registro foráneo

**@returns:**
* array: 
    * Object: {iddetalle_actividad, fecha_inicial_planeadas, fecha_final_planeadas, fecha_inicial_real, fecha_final_real, porcentaje_cumplimiento, ciclica, producto_fk} : Cuando hay registros encontrados
        * Ejm: 
        ```
        [
            {
                "iddetalle_actividad": 1,
                "fecha_inicial_planeadas": "2018* 05* 20",
                "fecha_final_planeadas": "2018* 05* 20",
                "fecha_inicial_real": "2018* 05* 20",
                "fecha_final_real": "2018* 05* 20",
                "porcentaje_cumplimiento": 10,
                "ciclica": 1,
                "producto_fk": 2
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```



## /search.php

**@params: GET**
* search (string): palabra o palabras para buscar

**@returns:**
* array: 
    * Object: {id, nombre, type} : Cuando hay registros encontrados, se muestran todos los registros con su respectivo tipo que concuerdan con la búsqueda.
        * Ejm: 
        ```
        [
            {
                "id": 80,
                "nombre": "6. Testing general, aplicación de pruebas de funcionalidad del chatbot",
                "type": "detalle_actividad"
            }
        ]
        ```
    * Array : Cuando no hay registros
        * Ejm: 
        ```    
        []
        ```
