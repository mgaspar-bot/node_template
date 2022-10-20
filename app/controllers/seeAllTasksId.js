const JsonFileManager = require('../models/JsonFileManager')

function seeAllTasksId (id) {
    const jfm = new JsonFileManager();

    let username = obj.users.find((user)=> user.id === id).userName;
    if (username === undefined) return console.log(`seeAllTasksId: error, id not found`);

    let obj = jfm.getObjFromFile();

    let tasks = obj.tasks.map((task) => task.user_id === id);

    let toShow = `Stored tasks for ${username}: \n`; //Aixo es pot fer?

    for (task of tasks) {
        toShow += task; //Haure de posar un toString aqui??
        toShow += '\n';
    }
    
    return toShow;
}


module.exports = seeAllTasksId;