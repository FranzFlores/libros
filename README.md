Proyecto de Libros con Neo4j
=============

## Requerimientos
Se especifican los siguientes paquetes y programas requeridos para el presente proyecto:

- [Neo4j](https://neo4j.com/download/ "Neo4j") (Base de datos)
- [Nodejs](https://nodejs.org/es/download/ "Nodejs") (BackEnd y FrontEnd)

## Instalación
Clone el repositorio con el siguiente comando:
- **Por HTTPS**

`git clone https://github.com/FranzFlores/libros.git`
- **Por SSH**

`git clone ssh://git@github.com:FranzFlores/libros.git`

**Nota:** para clonar por medio de SSH, se necesita una llave SSH y una contraseña fijada tanto en la cuenta como localmente en el computador.

-------------
## Características (features)
En el presente proyecto se han especificado las siguientes ramas de características:

### feature/BookController
                
----
En la presente rama se subio un unico commit con el controlador que permite el CRUD de los libros en la aplicacion.

`git flow start feature BookController`

`git flow finish feature BookController`

### feature/database
                
----
En esta rama se subio tanto la conexion con la base de datos Neo4j en un commit. En el segundo commit se subio algunas configuraciones respecto al archivo principal app.js

`git flow start feature database`

`git flow finish feature database`

### feature/BookView
                
----
En esta rama se agregaron los commits para las vistas de libro, el mensaje flash e inicio.

`git flow start feature BookView`

`git flow finish feature BookView`

### feature/modelos
                
----
En esta rama se agregaron los modelos para la base de datos de autor y libro.

`git flow start feature modelos`

`git flow finish feature modelos`

### feature/public
                
----
En esta rama se elimino una carpeta llamada stylesheet que no se la iba a utilizar, y creamos una carpeta llamada js en donde se añadio un archivo llamado author.js con funciones de la identidad autor.

`git flow start feature public`

`git flow finish feature public`

### feature/routes
                
----
En esta rama se eliminaron los archivos predeterminados de user.js y de index.js, y agregamos los archivos de books.js author.js e index.js que contienen las para las respectivas clases.

`git flow start feature routes`

`git flow finish feature routes`

### feature/author
                
----
En esta rama se añadieron los archivos para el controlador y vistas de Autores, además de el header y footer de las plantillas.

`git flow start feature author`

`git flow finish feature author`

-------------
## Corrección de errores encontrados (bugfixes)
En el presente proyecto se han especificado las siguientes ramas para la corrección de errores:

### bugfix/correcciones
                
----
En esta rama se corrigieron errores encontrados en el archivo principal de configuración de Nodejs.

`git flow start bugfix correcciones`

`git flow finish bugfix correcciones`

-------------
## Publicaciones (releases)
En el presente proyecto se han especificado las siguientes ramas de publicaciones:

### release/v0.1
                
----
En esta versión, se corrigieron algunos problemas que habían pasado desapercibidos anteriormente.

`git flow start release v0.1`

`git flow finish release v0.1`

`git push --tags`

-------------
## Corrección de errores en producción (hotfixes)
En el presente proyecto se han especificado las siguientes ramas para las correciones en producción:

### hotfix/v0.2
                
----
Se corrigieron errores encontrados en el archivo index.ejs, se especifica la versión 0.2 del proyecto.

`git flow start hotfix v0.2`

`git flow finish hotfix v0.2`

`git push --tags`

-------------
## Arbol de proceso
A continuación se adjunta una imagen con el resultado del proceso llevado a cabo con GitFlow, el cual generó el siguiente arbol:

*Grafico No.1 - Arbol Gitflow*
![](https://i.ibb.co/MVkNMGx/Arbol-Git-Flow.png)

------------