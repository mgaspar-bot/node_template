const CONSTANTS = require(appRoot + '/helpers/constants.js');
const ask = require(appRoot + '/helpers/ask');
const getDate = require(appRoot + '/helpers/getDate');
const JsonFileManager = require(appRoot + '/models/JsonFileManager.js');

class Task {
    

    async createTask(creatorId) {
        let description = ""
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()
        let taskId = obj.tasks.length +1
    
        description = await ask(
            (`Type your task :)\n`)
        );

        this.task_id = taskId
        this.creator_id = creatorId
        this.description = description
        this.create_date = getDate()
        this.status = CONSTANTS.STATUS_TODO
        this.closed_date = ""

        this.save()
        
    }

    async save() {
        // Check if the task id already exist - TO DO

        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let newTask = {
            "task_id" : this.task_id,
            "creator_id": this.creator_id,
            "description": this.description,
            "create_date": this.create_date,
            "status": this.status,
            "closed_date": this.closed_date
          }
        
        obj.tasks.push(newTask)
    
        jfm.rewriteFile(obj)
        console.table(newTask)
    }

    async seeAll() {
    let jfm = new JsonFileManager()
    let obj = await jfm.getObjFromFile()

    console.table(obj.tasks)
    }
}

module.exports = Task