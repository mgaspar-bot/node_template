const JsonFileManager = require('../models/JsonFileManager')

function seeAllTasksId (id) {
    const jfm = new JsonFileManager();

    let obj = jfm.getObjFromFile();

    let tasks = obj.tasks.map((task) => task.user_id === id);

    return tasks;
}


module.exports = seeAllTasksId;