const JsonFileManager = require('../models/JsonFileManager')

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
        toShow += JSON.stringify(task); 
        toShow += '\n\t';
    }/*
    We can make this part display things in a better way, for now it just works */
    return toShow;
}


module.exports = seeAllTasksId;