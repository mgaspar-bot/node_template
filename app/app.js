var path = require('path');
global.appRoot = path.resolve(__dirname);

const checkDependencies = require(appRoot + '/helpers/checkDependencies.js');
const createTask = require(appRoot + '/helpers/createTask.js');
const JsonFileManager = require(appRoot + '/models/JsonFileManager');
const seeAllTasksId = require(appRoot + '/helpers/seeAllTasksId');
const ask = require(appRoot + '/helpers/ask');

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
                await createTask(id);
            } else if (res == 2) {
                //modificaTasca(id)
            }else if (res == 3) {
                //borraTasca(id)
            } else if (res == 4) {
                //veure una tasca
            } else if (res == 5) {
                console.log(await seeAllTasksId(id));
            }
    } while (res != 0)
    process.exit();
};

async function whoThis() {
    //Check dependencies

    
    
    
    
    let jfm = new JsonFileManager();
    let userId;
    
    let username = await ask("Who dis??!!\n");
    // console.log(username);
    let obj = await jfm.getObjFromFile(); 
    let found = obj.users.filter((user) => user.userName == username);
    // console.log(found);
    if (found.length == 0){ //filter always returns an array, so it should always be safe to do found.length
       console.log(`Ur not in our registers, im writing you down...`);
       userId = obj.users.length + 1;
       console.log('userId '+userId);
       obj.users.push({
        "id":userId,
        "username":username
       });
       jfm.rewriteFile(obj);
    }else {
        userId = obj.users.filter((user) => user.userName === username)[0].id;
    }
    // console.log(userId);
   menu(userId);
}

/*
Im not catching errors from this read and write files.
Neither here nor above where its called

Ok so with this ugly catch I expect that if theres ever an error in the 
writeFileFromTemplate, it will at most try again one time (if it threw inside
the little "try" of checkDependecies). In any case the bigger catch of 
checkDependencies (the one that says have fun debugging) should work, show you
the error and know where it came from
*/






checkDependencies().then( () =>{
    // console.log(`I'm in the .then`);
    whoThis();
})
