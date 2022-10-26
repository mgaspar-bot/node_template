const path = require('path')
global.appRoot = path.resolve(__dirname)

const ask = require(appRoot + '/helpers/ask')
const Task = require(appRoot + '/models/task.js')
const task = new Task()

async function menu () {
  let res = ''

  const indexToModify = await task.seeTask()

  if (indexToModify !== undefined) {
    do {
      res = await ask(
            `What do you want to do? 
                1. Update existing task
                2. Erase task
                0. Bye!
                `)
      if (res === 1) {
        await task.modify(indexToModify)
      } else if (res === 2) {
        await task.deleteTask(indexToModify)
      }
    } while (res !== 0)
    process.exit()
  }
}

menu()
