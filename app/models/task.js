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
        this.modified_date = ""

        this.save()

    }

    async save() {
        // Check if the task id already exist - TO DO

        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let newTask = {
            "task_id": this.task_id,
            "creator_id": this.creator_id,
            "description": this.description,
            "create_date": this.create_date,
            "status": this.status,
            "modified_date": this.modified_date
        }

        obj.tasks.push(newTask)

        jfm.rewriteFile(obj)
        console.table(newTask)
    }

    async modify() {
        let jfm = new JsonFileManager()
        let obj = await jfm.getObjFromFile()

        let taskToModify = await ask(
            (`Please, type task ID to modify :)\n`)
        );

        let modificationType = await ask(
            `Please, select a modification type
                1. Modify task status
                2. Change task description
                0. Bye!
            `);

        if (modificationType == 1) {changeStatus(obj, taskToModify)} 
        else if (modificationType == 2) {changeDescription(obj, taskToModify)}
        }

        changeStatus(obj, taskToModify) {
            obj.task.filter(async (task) => {
                if (task.task_id === taskToModify) {
                    let newStatus = await ask(
                        `Please, select new status
                            1. To Do
                            2. In Progress
                            3. Completed
                            0. Bye!
                        `);
                    if (newStatus == 1) {
                        task.task_id = CONSTANTS.STATUS_TODO
                        task.modified_date = getDate()
                        console.table(obj.task[taskToModify])
                    } else if (newStatus == 2) {
                        task.task_id = CONSTANTS.STATUS_INPROGRESS
                        task.modified_date = getDate()
                        console.table(obj.task[taskToModify])
                    } else if (newStatus == 3) {
                        task.task_id = CONSTANTS.STATUS_DONE
                        task.modified_date = getDate()
                        console.table(obj.task[taskToModify])
                    } else {
                        console.log(`No changes were registered, have a great day!`)
                    }
                } else {
                    console.log(`No task found, try another ID`)
                }
            })
        }

        async changeDescription(obj) {
            let newDescription = await ask(
                (`Please, type the new task description :)\n`)
            );

            obj.task.filter((task) => {
                    if (task.task_id === taskToModify) {
                        task.description = newDescription
                    } else {
                        console.log(`No task found, try another ID`)
                    }
                })
        }

        async seeTask() {
            let jfm = new JsonFileManager()
            let obj = await jfm.getObjFromFile()

            let taskId = await ask(
                (`Type task ID to check :)\n`)
            );

            console.table(obj.tasks[taskId - 1])
        }

        async seeAll() {
            let jfm = new JsonFileManager()
            let obj = await jfm.getObjFromFile()

            console.table(obj.tasks)
        }
    }

    module.exports = Task