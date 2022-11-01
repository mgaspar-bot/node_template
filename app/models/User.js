const db = require(appRoot + '/models/PersistenceManager')

class User {
  id = ''
  userName = ''
  constructor (userName) {
    // Check user if user exists already, i.e. if
    // i have to return an existing

    if (!userName || typeof userName !== 'string' || userName.length < 1) {
      // console.log(`Invalid userName in constructor`);
      throw new Error('invalid userName in constructor')
    }

    this.userName = userName
  }

  async syncUserWithDb () { // this method should only be used after the log in, when you received the userName
    // if the userName doesnt exist, it creates it in db
    // if it exists, just fetch the correct id.
    const users = await db.getUsersArray()
    const found = users.find((user) => user.userName === this.userName)
    if (found !== undefined) {
      this.id = found.id
      return true
    }
    this.id = await this.getNextId()

    await db.saveToPersistence()
    return false
  }

  getId () {
    return this.id
  }

  getuserName () {
    return this.userName
  }

  setuserName (userName) {
    if (typeof userName === 'string') {
      this.userName = userName
    } else {
      console.log('Bad userName, cannot set')
      return -1
    }
  }

  setId (id) { // i'm not sure this should have a setter
    if (typeof id === 'number') {
      this.id = id
    } else {
      console.log('Bad id, cannot set')
      return -1
    }
  }

  async getNextId () {
    const users = await db.getUsersArray()
    if (users.length === 0) {
      return 1
    }
    return users[users.length - 1].id + 1
  }
}

module.exports = User
