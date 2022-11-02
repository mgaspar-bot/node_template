# Sprint 3.3 - TO DO Project

Aplicación que permite guardar una lista de tareas para hacer.
- Mostras las tareas e sus estados (pendentes, en progreso y hechas), hora de inicio y final, usuario que ha creado la tarea.
- Permite:
  - Crear tareas
  - Actualizar tareas
  - Borrar tareas
  - Listar todas las tareas
  - Listar una tarea determinada

## Modo de funcionamento

Para ejecutar la aplicación, utilice el siguiente comando:

> `$ node app/app.js `

El programa preguntará donde quieres guardar tus datos: 

1. Archivo JSON
1. Base de datos MySQL
1. Base de datos MongoDB

Actualmente solamente la opción 1 está implementada.


## Flujo de datos implementado

![Flujo de datos](./img/flow.jpg)

## Futuras implementaciones

- Ver todos los usuarios
- Modificar usuarios

## Referencias utilizadas

1. [Git Flow](https://www.atlassian.com/es/git/tutorials/comparing-workflows/gitflow-workflow)
1. [Starndard JS](https://standardjs.com/)
1. [¡Tu CÓDIGO JAVASCRIPT sin ERRORES! 🛑🐛 - Configurando el LINTER con ESLint y STANDARD JS](https://www.youtube.com/watch?v=QpDpRmlFfqI)
1. [Docker](https://www.docker.com/)

## Visual Studio Code Plugins
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [StardardJS](https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard)


## Equipo

- Cadevall Baulies, Alex (alexcadevall@gmail.com)
- Chaiben Machado, Marçal (marcal.chaiben@gmail.com)
- Gaspar, Marc 

<!-- 

## Documents:
- appData.json (contains):
    - User array (contains):
        - id
        - username
    - Task array (contains):
        - id
        - user_id
        - description
        - create_date
        - status
        - closed_date
- jsonFileManager.js (contains):
    - Path constructor
    - `function` Require JSON 
    - `function` Modify JSON 
- helpers.js (contains): 
    - `function` Create task 
    - `function` Update task 
    - `function` Erase task 
    - `function` Check a task 
    - `function` Check all tasks 
- app.js (contains):
    - console prompts
    - function calls
    - `function` menu (start) -->

