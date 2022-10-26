const CONSTANTS = require(appRoot + '/helpers/constants.js');
const ask = require(appRoot + '/helpers/ask');
const getDate = require(appRoot + '/helpers/getDate');
const JsonFileManager = require(appRoot + '/models/JsonFileManager.js');

class Task {


    async createTask(creatorId) {
        let description = ""
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()
        let taskId = obj.tasks.length + 1

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
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let newTask = {
            "task_id": this.task_id,
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

    async modify(indexToModify) {

        let modificationType = await ask(
            `Please, select a modification type
                1. Modify task status
                2. Change task description
                0. Bye!
            `);

        if (modificationType == 1) {
            this.changeStatus(indexToModify)
        } else if (modificationType == 2) {
            this.changeDescription(indexToModify)
        } else {
            console.log(`No changes were registered, have a great day!`)
        }
    }

    async changeStatus(indexToModify) {
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let taskToModify = await obj.tasks[indexToModify]

        if (taskToModify !== undefined) {
            let newStatus = await ask(
                `Please, select new status
                            1. To Do
                            2. In Progress
                            3. Completed
                            0. Bye!
                        `);
            if (newStatus == 1) {
                obj.tasks[indexToModify].status = CONSTANTS.STATUS_TODO
                obj.tasks[indexToModify].closed_date = getDate()
                console.table(obj.tasks[indexToModify])
                jfm.rewriteFile(obj)
            } else if (newStatus == 2) {
                obj.tasks[indexToModify].status = CONSTANTS.STATUS_INPROGRESS
                obj.tasks[indexToModify].closed_date = getDate()
                console.table(obj.tasks[indexToModify])
                jfm.rewriteFile(obj)
            } else if (newStatus == 3) {
                obj.tasks[indexToModify].status = CONSTANTS.STATUS_DONE
                obj.tasks[indexToModify].closed_date = getDate()
                console.table(obj.tasks[indexToModify])
                jfm.rewriteFile(obj)
            } else {
                console.log(`No changes were registered, have a great day!`)
            }
        } else {
            console.log(`No task found, try another ID`)
        }
    }

    async changeDescription(indexToModify) {
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let taskToModify = await obj.tasks[indexToModify]

        if (taskToModify !== undefined) {
            let newDescription = await ask(
                (`Please, type the new task description :)\n`)
            );
            obj.tasks[indexToModify].description = newDescription
            console.table(obj.tasks[indexToModify])
            jfm.rewriteFile(obj)
        } else {
            console.log(`No task found, try another ID`)
        }
    };

    async deleteTask(indexToModify){
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let deleteCheck = await obj.tasks[indexToModify]

        if (deleteCheck !== undefined) {
            console.table(obj.tasks[indexToModify])
        
            let confirmation = await ask(
                `Is this the task you want to delete?
                    1. Yes 
                    2. No 
                `);
            if (confirmation == 1) {
                obj.tasks.splice(indexToModify, 1)
                jfm.rewriteFile(obj)
                console.log(`Task deleted!`)
            } else {
                console.log(`No changes were registered, have a great day!`)
            }
        } else {
            console.log(`No task found, try another ID`)
        }
    };

    async seeTask() {
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let taskId = await ask(
            (`Type task ID to check :)\n`)
        );
        
        let indexToModify = taskId - 1

        if (obj.tasks[indexToModify] !== undefined) {
            console.table(obj.tasks[indexToModify])
            return indexToModify
        } else {
            console.log(`No task found, try another ID`)
        }  
    }

    async seeAll() {
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        console.table(obj.tasks)
    }
}

module.exports = Task