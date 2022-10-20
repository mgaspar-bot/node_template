const JsonFileManager = require('../models/JsonFileManager')

function seeAllTasksId (id) {
    const jfm = new JsonFileManager();

    let obj = jfm.getObjFromFile();

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
    }
    
    return toShow;
}


module.exports = seeAllTasksId;