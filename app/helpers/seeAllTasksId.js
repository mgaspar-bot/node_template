const JsonFileManager = require(appRoot+ '/models/JsonFileManager');
const  {STATUS_DONE} = require(appRoot + '/helpers/constants.js');

/*
mostrar el seu estat (pendents, en execució o acabades) i l'hora d'inici i final de la tasca, així com l'usuari/ària que la va donar d'alta
*/

async function seeAllTasksId (id) {
    const jfm = new JsonFileManager();
    
    let obj = await jfm.getObjFromFile();


    let user = obj.users.find((user)=> user.id === id);
    // console.log(user);
    if (user === undefined) return console.log(`seeAllTasksId: error, id not found (id:${id})`);

    

    let tasks = obj.tasks.filter((task) => task.creator_id === id);
    // console.log(tasks);

    let toShow = `Stored tasks for ${user.userName}: \n\n\t`;
    for (task of tasks) {
        toShow += task.description + '\n\t\t';
        toShow += 'status: '+task.status +'\n\t\t';
        toShow += 'started: '+task.create_date;
        if(task.status === STATUS_DONE) {
            toShow += '\n\t\tfinished: '+task.closed_date;
        }
        // toShow += JSON.stringify(task); 
        toShow += '\n\t';
    }/*
    We can make this part display things in a better way, for now it just works */
    return toShow;
}


module.exports = seeAllTasksId;