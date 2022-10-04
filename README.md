## Com utilitzar
Després de clonar:
```sh
   npm install
    npm run devStart

   ```
Instal·la les dependències i arrenca el server amb nodemon. Si el vols arrencar sense nodemon:
```sh
   node server.js
   ```
Important la col·lecció de requests al Postman pots provar les respostes del server.<br>
Tingues en compte:_
1. Has de posar els arxius corresponents per provar les requests a upload
2. El "autenticador" de /time llegeix el usuari i la contrasenya del arxiu .env. Si el canvies o el paquet dotenv no funciona, l'autenticació sempre fallarà.

## Enunciat
### Nivell 1
<ol>
<li>
Crea un servidor amb Express que retorni a una petició GET a l'endpoint /user un json amb el teu nom, edat i l'URL des d'on es fa la petició.
</li>
<li>
Afegeix un endpoint /upload per a pujar al servidor un arxiu de tipus png, jpg o gif amb una petició POST i que retorni un missatge d'error en cas que l'extensió de l'arxiu no coincideixi amb aquestes.
</li>
</ol>

### Nivell 2
<ol>
<li>
Crea un endpoint /time que rebi per POST com a paràmetre un JSON amb el nom d'usuari/ària i retorni un objecte JSON que contingui l'hora i data actual. Inclogui un middleware que afegeixi la capçalera Cache-control: no-cache. Habiliti CORS (Cross-Origin Resource Sharing) en les respostes, sigui mitjançant Express o mitjançant un altre middleware.
</li>
<li>
Afegeix un middleware a l'endpoint anterior que retorni un HTTP Status 401 - Unauthorized si la capçalera de la petició no conté autenticació bàsica (usuari/ària i contrasenya).
</li>
</ol>

### Nivell 3
<p>
Crea una petició GET a l'endpoint /pokemon/{id} que rebi un número de Pokémon, faci una cerca al Pokémon API i retorni el nom del Pokémon, la seva alçada i el seu pes.
</p>