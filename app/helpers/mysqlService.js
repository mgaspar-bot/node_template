const mysql = require('mysql')

class MySQLService {
  database = 'todo'
  host = 'localhost'
  user = 'node'
  password = 'todo_project'
  con = null

  constructor (database) {
    if (database) { this.database = database }
  }

  async openCon () {
    this.con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: 33060
    })
  }

  async mysql_query (sql) {
    return new Promise((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err) { return reject(err) }
        return resolve(result)
      })
    })
  }

  async query (sql) {
    await this.openCon()
    const result = await this.mysql_query(sql)
    this.con.end()
    return result
  }

  async print_query (sql) {
    const result = await this.query(sql)
    console.table(result)
  }

  async check_database () {
    // -----------------------------------------------------
    // Table `User`
    // -----------------------------------------------------
    await this.query('CREATE TABLE IF NOT EXISTS `User` (`user_id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NOT NULL, PRIMARY KEY (`user_id`), UNIQUE INDEX `name_UNIQUE` (`name` ASC)) ENGINE = InnoDB')
    // -----------------------------------------------------
    // Table `Task`
    // -----------------------------------------------------
    await this.query("CREATE TABLE IF NOT EXISTS `Task` ( `task_id` INT NOT NULL AUTO_INCREMENT, `description` TEXT NOT NULL, `create_date` DATETIME NOT NULL, `update_date` DATETIME NULL, `status` ENUM('to do', 'in progress', 'done') NULL, `user_id` INT NOT NULL, PRIMARY KEY (`task_id`), INDEX `fk_Task_User_idx` (`user_id` ASC), CONSTRAINT `fk_Task_User` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB")
  }
}
const mysqlService = new MySQLService('todo')
mysqlService.check_database()
