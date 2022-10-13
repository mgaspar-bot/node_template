## Api Daus
Aquest projecte és un exercici realitzat pel bootcamp de node.js de la IT academy. Consisteix en un 
petit servidor amb una API REST que dona suport a un joc de daus. Per poder utilitzar la API cal que 
rebis primer un JWT del endpoint /login i llavors pots registrar jugadors, tirar els daus, 
veure els històrics de tirades i victòries de cada jugador o globals i esborrar el històric de jugades.
<br>
La aplicació utilitza una base de dades SQL com a persistència, Sequelize com a ORM i express.js per 
muntar les rutes i aixecar el servidor.
També tens una col·lecció de postman amb requests preparades per provar el comportament de l'aplicació.

## Utilització
### Prerrequisits
Abans de començar, cal tenir escoltant el servidor local de mysql, ja que l'aplicació provarà de 
conectar-s'hi. Fet això, clonem el repositori i executem
```shell
npm install
```
Amb això haurem instal·lat tots els paquets necessaris per la aplicació. 
### .env
Seguidament cal que creïs un arxiu .env al mateix directori, que ha de contenir el nom d'usuari i 
contrasenya que vulguis usar per conectar-te a la base de dades (assegura't que l'usuari té permisos 
per crear dbs) i una string "secreta" que s'utilitzara per generar els json web tokens. Al arxiu 
.env.example pots veure el format que ha de tenir el teu .env. 
### login
El següent pas és iniciar el servidor i fer login com a admin al endpoint /login. Per iniciar el 
servidor pots utilitzar dos comandes:
```shell
#Per iniciar-lo amb node:
node server.js
#Per iniciar-lo amb nodemon:
npm run devStart
```
Apareixeran per consola els missatges "db online" i "server escoltant al port 3000", que indiquen que 
tot ha anat bé i podem començar a enviar HTTP requests a la aplicació. La primera request haurà 
de ser un POST a /login que contingui un body amb aquests dos fields:
```shell
{
    "nom":"admin",
    "password":"admin1234"
}
```
Els valors del nom i la password són per defecte, estàn com a defaultValue al model de la taula 
"Admins" i són introduïts a la base de dades al iniciar-se el servidor.<br>
Com a resposta a la request rebras un JWT que serà vàlid fins que el server es torni a iniciar. 
Has d'afegir-lo al authorization header de les requests a qualsevol altre endpoint amb el format 
"BEARER token":
```shell
#in headers
"authorizaton":"BEARER 'stringQueHasRebut'"
```
### Endpoints
Ara pots accedir a tots els altres endpoints de la aplicació. Aquí tens una llista amb les seves funcionalitats:
<ul>
    <li>-/players</li>
        <ol>
        <li>1.POST: crea un jugador/a. Espera el "username" al body. Si el username està buit, l'usuari es diu "Anonim". Si no està buit, cal que sigui únic.</li>
        <li>2.PUT players/:id : modifica el nom del jugador/a.</li>
        <li>3.GET: retorna el llistat de tots els jugadors/es del sistema amb el seu percentatge d’èxits.</li>
        </ol>
    <li>-/games/:id</li>
        <ol>
        <li>1.POST: un jugador/a específic realitza una tirada.</li>
        <li>2.DELETE: elimina les tirades del jugador/a (reseteja el històric de tirades a 0).</li>
        <li>3.GET: retorna el llistat de tirades per un jugador/a.</li>
        </ol>
    <li>ranking</li>
        <ol>
        <li>1.GET: retorna un ranking de jugadors/es ordenat per percentatge d'èxits i el percentatge </li>d’èxits mig del conjunt de tots els jugadors/es.
        <li>2.GET /loser : retorna el jugador/a amb pitjor percentatge d’èxit.</li>
        <li>3.GET /winner: retorna el jugador/a amb millor percentatge d’èxit.</li>
        </ol>
</ul>

