var mysql = require('mysql');

class MySQLService{
  database = "todo"
  host = "localhost"
  user = "node"
  password = "todo_project"
  con = null

  constructor(database){
    if(database)
      this.database = database
  }

  async openCon(){
    this.con = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      port: 33060
    });
  }

  async mysql_query(sql) {
    return new Promise((resolve, reject) => {
      this.con.query(sql, (err, result) => {
        if (err)
          return reject(err)
        return resolve(result)
      })
    })
  }

  async query(sql){
    await this.openCon()
    let result = await this.mysql_query(sql)
    this.con.end()
    return result
  }

  async print_query(sql){
    let result = await this.query(sql);
    console.table(result)
  }

  async check_database() {
    const database = this.query("show databases WHERE `Database` = 'todo'")

  }

}
mysql_service = new MySQLService('todo')
mysql_service.print_query("show databases WHERE `Database` = 'todo'")