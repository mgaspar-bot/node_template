const CONSTANTS = require(appRoot + '/helpers/constants.js')
const ask = require(appRoot + '/helpers/ask')
const getDate = require(appRoot + '/helpers/getDate')
const JsonFileManager = require(appRoot + '/models/JsonFileManager.js')

class Task {
  async createTask (creatorId) {
    let description = ''
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()
    let taskId
    if (obj.tasks.length === 0) {
      taskId = 1
    } else {
      taskId = obj.tasks[obj.tasks.length - 1].task_id + 1
    }

    description = await ask(
      'Type your task :) Or 0 to go back\n'
    )
    if (description === '0') {
      return
    }

    this.task_id = taskId
    this.creator_id = creatorId
    this.description = description
    this.create_date = getDate()
    this.status = CONSTANTS.STATUS_TODO
    this.closed_date = ''

    this.save()
  }

  async save () {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const newTask = {
      task_id: this.task_id,
      creator_id: this.creator_id,
      description: this.description,
      create_date: this.create_date,
      status: this.status,
      closed_date: this.closed_date
    }

    obj.tasks.push(newTask)

    jfm.rewriteFile(obj)
    console.table(newTask)
  }

  async modify (indexToModify) {
    let modificationType
    do {
      modificationType = await ask(
                `Please, select a modification type
                    1. Modify task status
                    2. Change task description
                    0. Back to task menu
                `)

      if (modificationType === '1') {
        await this.changeStatus(indexToModify)
      } else if (modificationType === '2') {
        await this.changeDescription(indexToModify)
      }
    } while (modificationType !== '0')
  }

  async changeStatus (indexToModify) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const taskToModify = await obj.tasks[indexToModify]

    if (taskToModify !== undefined) {
      const newStatus = await ask(
                `Please, select new status
                            1. To Do
                            2. In Progress
                            3. Completed
                            0. Go back
                        `)
      if (newStatus === '1') {
        obj.tasks[indexToModify].status = CONSTANTS.STATUS_TODO
        // obj.tasks[indexToModify].closed_date = getDate()
        console.table(obj.tasks[indexToModify])
        await jfm.rewriteFile(obj)
      } else if (newStatus === '2') {
        obj.tasks[indexToModify].status = CONSTANTS.STATUS_INPROGRESS
        // obj.tasks[indexToModify].closed_date = getDate()
        console.table(obj.tasks[indexToModify])
        await jfm.rewriteFile(obj)
      } else if (newStatus === '3') {
        obj.tasks[indexToModify].status = CONSTANTS.STATUS_DONE
        obj.tasks[indexToModify].closed_date = getDate()
        // console.table(obj.tasks[indexToModify])
        await jfm.rewriteFile(obj)
      } else {
        console.log('No changes were registered, have a great day!')
      }
    } else {
      console.log('No task found, try another ID')
    }
  }

  async changeDescription (indexToModify) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const taskToModify = await obj.tasks[indexToModify]

    if (taskToModify !== undefined) {
      const newDescription = await ask(
        ('Please, type the new task description :) Or 0 to go back\n')
      )
      if (newDescription === '0') return
      obj.tasks[indexToModify].description = newDescription
      //   console.table(obj.tasks[indexToModify])
      await jfm.rewriteFile(obj)
    } else {
      console.log('No task found, try another ID')
    }
  };

  async deleteTask (indexToModify) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const deleteCheck = await obj.tasks[indexToModify]

    if (deleteCheck !== undefined) {
      console.table(obj.tasks[indexToModify])

      const confirmation = await ask(
                `Is this the task you want to delete?
                    1. Yes 
                    2. No 
                `)
      if (confirmation === '1') {
        obj.tasks.splice(indexToModify, 1)
        await jfm.rewriteFile(obj)
        console.log('Task deleted!')
      } else {
        console.log('No changes were registered, have a great day!')
      }
    } else {
      console.log('No task found, try another ID')
    }
  };

  async seeTask (creatorId) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const taskId = await ask(
      'Type task ID to check :) Or 0 to go back\n'
    )

    const indexToModify = obj.tasks.findIndex(task => task.task_id === Number(taskId))

    if (obj.tasks[indexToModify] !== undefined && obj.tasks[indexToModify].creator_id === creatorId) {
      console.table(obj.tasks[indexToModify])
      return indexToModify
    } else if (taskId === '0') {
      return 0
    } else {
      console.log('No task found, try another ID')
    }
  }

  async seeAll (userId) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const userTasks = obj.tasks.filter((task) => { return task.creator_id === userId })
    console.table(userTasks)
  }
}

module.exports = Task
