var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "todo_project",
  port: 33060
});

// Connect to server

con.connect(function(err) {
  if (err) throw err.message;
  console.log("Connected!");

  // Show databases
  
  con.query('show databases', (err, result) => {
    if (err) throw err.message;
    console.table(result)
  })
  
  con.end()
});