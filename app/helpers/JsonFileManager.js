const fs = require('fs/promises')

class JsonFileManager {
  constructor () {
    this.path = appRoot + '/appData.json'
  }

  async getObjFromFile () { // pots canviar coses passant-li el teu this
    let obj
    try {
      obj = require(this.path)
      return obj
    } catch (error) {
      console.log(error)
    }
  }

  async rewriteFile (obj) {
    try {
      await fs.writeFile(this.path, JSON.stringify(obj), 'utf-8')
      return
    } catch (error) {
      console.log('JsonFileManager: I messed up the file writing, we\'re basically dead now')
      console.log(error)
    }
  }
}

module.exports = JsonFileManager
