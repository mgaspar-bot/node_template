const ask = require(appRoot + '/helpers/ask.js')
const checkJsonFile = require(appRoot + '/helpers/checkJsonFile')
const MysqlService = require(appRoot + '/helpers/MysqlService')

async function checkDependencies (reset) {
  let persistence
  do {
    persistence = await ask('Which persistence will you use?\n1. Json file in disk\n2. Mysql\n3. MongoDb\n')
  } while (persistence !== '1' && persistence !== '2' && persistence !== '3')
  global.persistence = persistence

  if (global.persistence === '1') {
    await checkJsonFile(reset)
  } else if (global.persistence === '2') { // check db exists, i can talk to it and has the tables i need
    const mysqlService = new MysqlService()
    await mysqlService.checkDatabase()
  } else if (global.persistence === '3') {
    console.log('Function not implemented yet')
    process.exit()
  }
}

module.exports = checkDependencies
