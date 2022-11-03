const JsonFileManager = require(appRoot + '/helpers/JsonFileManager')
const MysqlService = require(appRoot + '/helpers/MysqlService')
const mysql = require('mysql')

class PersistenceManager {
  // "getters" that just return an array with all users or all tasks

  static async getUsersArray () {
    if (global.persistence === '1') {
      const jfm = new JsonFileManager()
      const obj = await jfm.getObjFromFile()
      return obj.users
    } else if (global.persistence === '2') {
      const mysqlService = new MysqlService()
      return await mysqlService.query('SELECT * FROM users')
    } else {
      console.log('global.persistence !== "1" or "2" so I cant go on')
    }
  }

  static async getTasksArray () {
    if (global.persistence === '1') {
      const jfm = new JsonFileManager()
      const obj = await jfm.getObjFromFile()
      return obj.tasks
    } else if (global.persistence === '2') {
      const mysqlService = new MysqlService()
      return await mysqlService.query('SELECT * FROM tasks')
    } else {
      console.log('global.persistence !== "1" or "2" so I cant go on')
    }
  }

  // "setters" with all the logic to correctly write to persistence while only receiving the object you wish to write
  // this class can distinguish if it's a task or a user by checking the properties of the object
  // and can distinguish if you want to insert or update by checking the id
  // Only saveToPersistence should be used by the other classes
  static async saveToPersistence (objToWrite) {
    if (global.persistence === '1') {
      await this.saveToJson(objToWrite)
    } else if (global.persistence === '2') {
      await this.saveToMySQL(objToWrite)
    } else {
      console.log('global.persistence !== "1" or "2" so I cant go on')
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

  static async saveToMySQL (objToWrite) {
    const query = `INSERT INTO tasks ( task_id, description, create_date, closed_date, status, creator_id ) VALUES ( ${mysql.escape(objToWrite.task_id)}, ${mysql.escape(objToWrite.description)}, ${mysql.escape(objToWrite.create_date)}, ${mysql.escape(objToWrite.closed_date)}, ${mysql.escape(objToWrite.status)}, ${mysql.escape(objToWrite.creator_id)}) ON DUPLICATE KEY UPDATE description = ${mysql.escape(objToWrite.description)}, create_date = ${mysql.escape(objToWrite.create_date)}, closed_date = ${mysql.escape(objToWrite.closed_date)}, status = ${mysql.escape(objToWrite.status)}, creator_id = ${mysql.escape(objToWrite.creator_id)}`
    const mysqlService = new MysqlService()
    await mysqlService.query(query)
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
    } else if (global.persistence === '2') {
      const mysqlService = new MysqlService()
      return await mysqlService.query(`DELETE FROM tasks WHERE task_id = ${mysql.escape(taskId)}`)
    } else {
      console.log('global.persistence !== "1" or "2" so I cant go on')
    }
  }
}

module.exports = PersistenceManager
