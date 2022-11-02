const JsonFileManager = require(appRoot + '/helpers/JsonFileManager')
const MysqlService = require(appRoot + '/helpers/mysqlService')

class PersistenceManager {
  jfm = null
  mysqlService = null
  constructor () {
    this.jfm = new JsonFileManager()
    this.mysqlService = new MysqlService()
  }
  // "getters" that just return an array with all users or all tasks

  static async getUsersArray () {
    if (global.persistence === '1') {
      const obj = await this.jfm.getObjFromFile()
      return obj.users
    } else if (global.persistence === '2') {
      return await this.mysqlService.query('SELECT * FROM users')
    } else {
      console.log('global.persistence !== \'1\' so i cant go on')
    }
  }

  static async getTasksArray () {
    if (global.persistence === '1') {
      const obj = await this.jfm.getObjFromFile()
      return obj.tasks
    } else {
      console.log('global.persistence !== \'1\' so i cant go on')
    }
  }

  // "setters" with all the logic to correctly write to persistence while only receiving the object you wish to write
  // this class can distinguish if it's a task or a user by checking the properties of the object
  // and can distinguish if you want to insert or update by checking the id
  // Only saveToPersistence should be used by the other classes
  static async saveToPersistence (objToWrite) {
    if (global.persistence === '1') {
      await this.saveToJson(objToWrite)
    } else {
      console.log('global.persistence !== \'1\' so i cant go on')
    }
  }

  static async saveToJson (objToWrite) {
    const jfm = new JsonFileManager()
    const obj = await jfm.getObjFromFile()

    const receivedProperties = Object.getOwnPropertyNames(objToWrite) // get an array with the names (strings) of the properties of the object you received

    if (receivedProperties.includes('id')) { // case User
      const found = obj.users.find((user) => user.id === objToWrite.id)
      if (found === undefined) {
        obj.users.push(objToWrite)
        await jfm.rewriteFile(obj)
        return
      }
      for (const user of obj.users) {
        if (user.id === objToWrite.id) {
          user.userName = objToWrite.userName
        }
      }
      await jfm.rewriteFile(obj)
    } else if (receivedProperties.includes('task_id')) { // case Task
      const index = obj.tasks.findIndex((task) => task.task_id === objToWrite.task_id)
      if (index === -1) {
        obj.tasks.push(objToWrite)
      } else {
        obj.tasks.splice(index, 1, objToWrite)
      }
      await jfm.rewriteFile(obj)
    }
  }

  // delete task is different as it only receives the task_id and you just delete that id from persistence
  static async deleteTask (taskId) {
    if (global.persistence === '1') {
      const jfm = new JsonFileManager()
      const obj = await jfm.getObjFromFile()
      const index = obj.tasks.findIndex((task) => task.task_id === taskId)
      if (index !== -1) {
        obj.tasks.splice(index, 1)
        await jfm.rewriteFile(obj)
      }
    } else {
      console.log('global.persistence !== \'1\' so i cant go on')
    }
  }
}

module.exports = PersistenceManager
