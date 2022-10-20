var path = require('path');
global.appRoot = path.resolve(__dirname)

const createTask = require (appRoot + '/helpers/helper.js')
const JsonFileManager = require(appRoot + '/models/JsonFileManager');
const readline = require('readline');
const rl = readline.createInterface( {
	input : process.stdin,
	output : process.stdout
});
function ask (str) {
	return new Promise ( (res, rej) => {
		rl.setPrompt(str);
		rl.prompt();
		rl.on('line', (resposta) => {res(resposta)});
    })
}
/*
Creeu una aplicació que permeti portar un llistat de tasques per fer. Ha de contemplar l'opció d'afegir tasques, llistar-les i mostrar 
el seu estat (pendents, en execució o acabades) i l'hora d'inici i final de la tasca, així com l'usuari/ària que la va donar d'alta
S'ha d'utilitzar per a la consola i ha de contenir les següents opcions: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les 
tasques o llistar una tasca específica.
*/
async function menu (id) {
    let res = "";
    do {
        res = await ask(
            `What do you want to do? 
                1. Create new task
                2. Update existing task
                3. Erase task
                4. Check a task
                5. Check all my tasks
                0. Bye!
                `);
            if (res == 1){
                createTask(id);
            } else if (res == 2) {
                //modificaTasca(id)
            }else if (res == 3) {
                //borraTasca(id)
            } else if (res == 4) {
                //veure una tasca
            } else if (res == 5) {
                //veure totes les tasques d'un usuari
            }
    } while (res != 0)
    process.exit();
};

async function whoThis() {
    let jfm = new JsonFileManager();
    let userId;
    
    let username = await ask("Who dis??!!\n");
    let obj = jfm.getObjFromFile();
    let found = obj.users.filter((user) => user.username === username);
    if (!found.id){
       console.log(`Ur not in our registers, im writing you down...`);
       userId = obj.users.length + 1;
       console.log('userId '+userId);
       obj.users.push({
        "id":userId,
        "username":username
       });
       jfm.rewriteFile(obj);
    }else {
        userId = obj.users.filter((user) => user.username === username)[0];
    }
   menu(userId);
}

whoThis();
