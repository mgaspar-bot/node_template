const JsonFileManager = require(appRoot + '/models/JsonFileManager.js');
const JsonData = require(appRoot + '/appData.json');
const CONSTANTS = require(appRoot + '/helpers/constants.js');
const ask = require(appRoot + '/helpers/ask');
const getDate = require(appRoot + '/helpers/getDate');

const jfm = new JsonFileManager();

async function createTask(id) {
    let task = ""
    let taskId = JsonData.tasks.length +1

    task = await ask(
        (`Type your task :)\n`)
    );


    let obj = await jfm.getObjFromFile()

    obj.tasks.push({
        "task_id" : taskId,
        "creator_id": id,
        "description": task,
        "create_date": getDate(),
        "status": CONSTANTS.STATUS_TODO,
        "closed_date": ""
    })

    jfm.rewriteFile(obj)
    console.log('Task created!')

}

module.exports = createTask;