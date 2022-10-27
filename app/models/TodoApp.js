const JsonFileManager = require(appRoot + '/models/JsonFileManager')
const Task = require('./task')
const User = require(appRoot + '/models/User')
const ask = require(appRoot + '/helpers/ask')
const task = new Task()

class TodoApp {
  user = ''

  async init () { // this should do what whodis does more or less
    let username = ''
    do {
      username = await ask('Please enter your username\n')
    } while (username === '') // the prompt always returns a string
    this.user = new User(username)
    // let userNameWasInDb = await this.user.syncUserWithDb();
    if (!(await this.user.syncUserWithDb())) {
      console.log(`${username} registered correctly`)
    }
  }

  async mainMenu () {
    console.log(`Welcome ${this.user.username}`)
    let res = ''
    do {
      res = await ask(
                `Please choose an option 
                    1. Create a new task
                    2. Go to my tasks
                    0. Bye!
`)
      if (res === '1') {
        await task.createTask(this.user.id)
      } else if (res === '2') {
        await task.seeAll(this.user.id)
        this.taskMenu()
      }
    } while (res !== '0')
    process.exit()
  }

  async taskMenu () {
    let res = ''

    let indexToModify
    do {
      indexToModify = await task.seeTask(this.user.id)
    } while (indexToModify === undefined)
    if (indexToModify === 0) {
      this.mainMenu()
      return
    }
    do {
      const presentTask = await this.queryDbForTask(indexToModify)
      console.table(presentTask)
      res = await ask(
                    `What do you want to do? 
                        1. Modify task status
                        2. Change task description
                        3. Erase this task
                        0. Back to main menu
                        `)
      if (res === '1') {
        await task.changeStatus(indexToModify)
      } else if (res === '2') {
        await task.changeDescription(indexToModify)
      } else if (res === '3') {
        await task.deleteTask(indexToModify)
        res = '0'
        // without this if you delete a task, you go back to taskMenu (1.Modify status...)
        // but since you deleted an entry in the array now indexToModify doesnt point to the right task, so you can end
        // up accessing a task which is not yours
        // this just forces you out of the loop into the mainMenu which is inconsistent with the rest of the options but meh
      }
    } while (res !== '0')
    this.mainMenu()
  }

  async queryDbForTask (taskId) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    if (typeof taskId === 'number') {
      return obj.tasks[taskId]
    //   return obj.tasks.find((task) => task.task_id === taskId)
    } else {
      return obj.tasks
    }
  }

  async queryDbForUser (userId) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    if (typeof taskId === 'number') {
      return obj.users.find((user) => user.id === userId)
    } else {
      return obj.users
    }
  }
}

module.exports = TodoApp
