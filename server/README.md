# Server
Aquest directori conté el backend del
projecte

## Prerrequisits i instal·lació
Per funcionar adequadament, el backend 
requereix dues coses: un servidor local 
(i encès, és clar) de mysql i un fitxer 
.env amb les següents variables d'entorn
declarades:
```
DB_USERNAME=el_teu_nom_dusuari_mysql
DB_PASSWORD=la_teva_contrasenya
DB_NAME=el_nom_que_vulguis_posar-li_a_la_db_que_es_creara

RESET_DB=false

AUTH_SECRET=una_string_qualsevol
```
El fitxer .env ha d'anar FORA DE LA CARPETA SERVER, al directori arrel del projecte, al mateix nivell que els directoris client i server. Si al paràmetre RESET_DB hi escrius "true" la base de dades s'esborrarà cada cop que engeguis el servidor.
Un cop has arrencat el servidor mysql i has escrit el fitxer .env amb el teu usuari i contrasenya, cal que vagis al directori server i instalis les dependències de node necessàries:
```bash
npm install
```
## Arrencada
Per arrencar-lo n'hi ha prou d'executar
el command
```bash
npm start
```
Es compilarà el codi font, s'arrecarà
el servidor i veuràs per pantalla el 
missatge "Server escoltant al port 3000".
Ara pots utilitzar l'aplicació des del front amb normalitat.
