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

  async mysqlQuery (sql) {
    return new Promise((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err) { return reject(err) }
        return resolve(result)
      })
    })
  }

  async query (sql) {
    await this.openCon()
    const result = await this.mysqlQuery(sql)
    await this.con.end()
    return result
  }

  async printQuery (sql) {
    const result = await this.query(sql)
    console.table(result)
  }

  async checkDatabase () {
    // -----------------------------------------------------
    // Table `User`
    // -----------------------------------------------------
    await this.query('CREATE TABLE IF NOT EXISTS `todo`.`users` ( `id` INT NOT NULL AUTO_INCREMENT, `userName` VARCHAR(45) NOT NULL, PRIMARY KEY (`id`), UNIQUE INDEX `name_UNIQUE` (`userName` ASC)) ENGINE = InnoDB')
    // -----------------------------------------------------
    // Table `Task`
    // -----------------------------------------------------
    await this.query("CREATE TABLE IF NOT EXISTS `todo`.`tasks` ( `task_id` INT NOT NULL AUTO_INCREMENT, `description` TEXT NOT NULL, `create_date` VARCHAR(14) NOT NULL, `closed_date` VARCHAR(14) NULL, `status` ENUM('to do', 'in progress', 'done') NULL, `creator_id` INT NOT NULL, PRIMARY KEY (`task_id`), INDEX `fk_Task_User_idx` (`creator_id` ASC), CONSTRAINT `fk_Task_User` FOREIGN KEY (`creator_id`) REFERENCES `todo`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION) ENGINE = InnoDB")

    // Users sample data
    await this.query("INSERT INTO `todo`.`users` (`id`, `userName`) VALUES (1, 'Alex') ON DUPLICATE KEY UPDATE userName=userName")
    await this.query("INSERT INTO `todo`.`users` (`id`, `userName`) VALUES (2, 'Marçal') ON DUPLICATE KEY UPDATE userName=userName")
    await this.query("INSERT INTO `todo`.`users` (`id`, `userName`) VALUES (3, 'Marc') ON DUPLICATE KEY UPDATE userName=userName")

    // Tasks sample data
    await this.query("INSERT INTO `todo`.`tasks` (`task_id`, `description`, `create_date`, `closed_date`, `status`, `creator_id`) VALUES ('1', 'teach gitflow to boneheads', '2022-11-1', '2022-11-2', 'done', '2') ON DUPLICATE KEY UPDATE description = description")
    await this.query("INSERT INTO `todo`.`tasks` (`task_id`, `description`, `create_date`, `status`, `creator_id`) VALUES ('2', 'clean dishes', '2022-10-1', 'to do', '3') ON DUPLICATE KEY UPDATE description = description")
    await this.query("INSERT INTO `todo`.`tasks` (`task_id`, `description`, `create_date`, `status`, `creator_id`) VALUES ('3', 'fix door', '2022-10-15', 'to do', '1') ON DUPLICATE KEY UPDATE description = description")
    await this.query("INSERT INTO `todo`.`tasks` (`task_id`, `description`, `create_date`, `status`, `creator_id`) VALUES ('4', 'walk dogs', '2022-10-22', 'to do', '1') ON DUPLICATE KEY UPDATE description = description")
    await this.query("INSERT INTO `todo`.`tasks` (`task_id`, `description`, `create_date`, `status`, `creator_id`) VALUES ('5', 'abolish democracy', '2022-1-1', 'in progress', '3') ON DUPLICATE KEY UPDATE description = description")
  }
}
module.exports = MySQLService
