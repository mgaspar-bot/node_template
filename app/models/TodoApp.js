const Task = require(appRoot + '/models/Task')
const User = require(appRoot + '/models/User')
const ask = require(appRoot + '/helpers/ask')

class TodoApp {
  user = ''
  task = ''

  constructor () {
    this.task = new Task()
  }

  async init () {
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
    console.log(`Welcome ${this.user.userName}`)
    let res = ''
    do {
      res = await ask(
                `Please choose an option 
                    1. Create a new task
                    2. Go to my tasks
                    0. Bye!
`)
      if (res === '1') {
        await this.task.createTask(this.user.id)
      } else if (res === '2') {
        await this.task.seeAll(this.user.id)
        this.taskMenu()
      }
    } while (res !== '0')
    process.exit()
  }

  async taskMenu () {
    let res = ''

    let indexToModify
    do {
      indexToModify = await this.task.seeTask(this.user.id)
    } while (indexToModify === undefined)
    if (indexToModify === 0) {
      this.mainMenu()
      return
    }
    do {
      res = await ask(
                    `What do you want to do? 
                        1. Modify task status
                        2. Change task description
                        3. Erase this task
                        0. Back to main menu
                        `)
      if (res === '1') {
        await this.task.changeStatus(indexToModify)
      } else if (res === '2') {
        await this.task.changeDescription(indexToModify)
      } else if (res === '3') {
        await this.task.deleteTask(indexToModify)
        res = '0'
        // without this if you delete a task, you go back to taskMenu (1.Modify status...)
        // but since you deleted an entry in the array now indexToModify doesnt point to the right task, so you can end
        // up accessing a task which is not yours
        // this just forces you out of the loop into the mainMenu which is inconsistent with the rest of the options but meh
      }
    } while (res !== '0')
    this.mainMenu()
  }
}

module.exports = TodoApp
