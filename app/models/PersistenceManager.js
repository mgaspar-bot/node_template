const JsonFileManager = require(appRoot + '/models/JsonFileManager')

class PersistenceManager {
  // "getters" that just return an array with all users or all tasks
  static async getUsersArray () {
    if (global.persistence === '1') {
      const jfm = new JsonFileManager()
      const obj = await jfm.getObjFromFile()
      return obj.users
    } else {
      console.log('global.persistence !== \'1\' so i cant go on')
    }
  }

  static async getTasksArray () {
    if (global.persistence === '1') {
      const jfm = new JsonFileManager()
      const obj = await jfm.getObjFromFile()
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
      if (found === undefined) { // if the id is not in the db, just add it to the file
        obj.users.push(objToWrite)
        await jfm.rewriteFile(obj)
        return
      }
      // if the id already exists, just change the username
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
