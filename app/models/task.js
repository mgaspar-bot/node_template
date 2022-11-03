const CONSTANTS = require(appRoot + '/helpers/constants.js')
const ask = require(appRoot + '/helpers/ask')
const getDate = require(appRoot + '/helpers/getDate')
const db = require(appRoot + '/models/PersistenceManager')

class Task {
  async createTask (creatorId) {
    let description = ''
    const tasks = await db.getTasksArray()

    let taskId
    if (tasks.length === 0) {
      taskId = 1
    } else {
      taskId = tasks[tasks.length - 1].task_id + 1
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

    await this.save()
  }

  async save () {
    const newTask = {
      task_id: this.task_id,
      creator_id: this.creator_id,
      description: this.description,
      create_date: this.create_date,
      status: this.status,
      closed_date: this.closed_date
    }

    await db.saveToPersistence(newTask)
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
    const tasks = await db.getTasksArray()

    const taskToModify = await tasks[indexToModify]

    if (taskToModify !== undefined) {
      const newStatus = await ask(
                `Please, select new status
                            1. To Do
                            2. In Progress
                            3. Completed
                            0. Go back
                        `)
      if (newStatus === '1') {
        taskToModify.status = CONSTANTS.STATUS_TODO
      } else if (newStatus === '2') {
        taskToModify.status = CONSTANTS.STATUS_INPROGRESS
      } else if (newStatus === '3') {
        taskToModify.status = CONSTANTS.STATUS_DONE
        taskToModify.closed_date = getDate()
      } else {
        console.log('No changes were registered, have a great day!')
      }
      await db.saveToPersistence(taskToModify) // im calling saveToPersistence even if nothing changed but meh
      console.table(taskToModify)
    } else {
      console.log('No task found, try another ID')
    }
  }

  async changeDescription (indexToModify) {
    const tasks = await db.getTasksArray()

    const taskToModify = await tasks[indexToModify]

    if (taskToModify !== undefined) {
      const newDescription = await ask(
        ('Please, type the new task description :) Or 0 to go back\n')
      )
      if (newDescription === '0') return
      taskToModify.description = newDescription
      console.table(taskToModify)
      await db.saveToPersistence(taskToModify)
    } else {
      console.log('No task found, try another ID')
    }
  };

  async deleteTask (indexToModify) {
    const tasks = await db.getTasksArray()

    const deleteCheck = await tasks[indexToModify]

    if (deleteCheck !== undefined) {
      console.table(tasks[indexToModify])

      const confirmation = await ask(
                `Is this the task you want to delete?
                    1. Yes 
                    2. No 
                `)
      if (confirmation === '1') {
        await db.deleteTask(tasks[indexToModify].task_id)
        console.log('Task deleted!')
      } else {
        console.log('No changes were registered, have a great day!')
      }
    } else {
      console.log('No task found, try another ID')
    }
  };

  async seeTask (creatorId) {
    const tasks = await db.getTasksArray()

    const taskId = await ask(
      'Type task ID to check :) Or 0 to go back\n'
    )

    const indexToModify = tasks.findIndex(task => task.task_id === Number(taskId))

    if (tasks[indexToModify] !== undefined && tasks[indexToModify].creator_id === creatorId) {
      console.table(tasks[indexToModify])
      return { i: indexToModify }
    } else if (taskId === '0') {
      return 0
    } else {
      console.log('No task found, try another ID')
    }
  }

  async seeAll (userId) {
    const tasks = await db.getTasksArray()

    const userTasks = tasks.filter((task) => { return task.creator_id === userId })
    console.table(userTasks)
  }
}

module.exports = Task
