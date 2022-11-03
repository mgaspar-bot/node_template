/* eslint-env jest */
/* eslint-disable no-new */
require('../app/app') // the only purpose of this require is to set global.appRoot
const checkDependencies = require('../app/helpers/checkDependencies')
const JsonFileManager = require('../app/helpers/JsonFileManager')

const User = require('../app/models/User')

const jfm = new JsonFileManager()

describe('Classe User: ', () => {
  describe('Constructor', () => {
    test('Can be instantiated', () => {
      const user = new User('H')
      expect(user).toBeInstanceOf(User)
    })
    test('Constructor called with no params throws an error', () => {
      try {
        new User()
      } catch (error) {
        expect(error.message).toBe('invalid username in constructor')
      }
    })
    test('Number as param throws an error', () => {
      try {
        new User(87)
      } catch (error) {
        expect(error.message).toBe('invalid username in constructor')
      }
    })
    test('Empty string as param throws an errorr', () => {
      try {
        new User('')
      } catch (error) {
        expect(error.message).toBe('invalid username in constructor')
      }
    })
    test('Valid username correctly instantiates user', () => {
      const pere = new User('Pere')
      expect(pere).toBeInstanceOf(User)
      expect(pere.username).toBe('Pere')
    })
  })
  describe('SyncUserWithDb', () => {
    test('If the username was already registered, puts the correct id into the instance', async () => {
      await checkDependencies('reset')
      const u1 = new User('Marc')
      await u1.syncUserWithDb()
      expect(u1.getId()).toBe(3)
      const u2 = new User('Marçal')
      await u2.syncUserWithDb()
      expect(u2.getId()).toBe(2)
      const u3 = new User('Alex')
      await u3.syncUserWithDb()
      expect(u3.getId()).toBe(1)
    })
    test('If the username wasn\'t already in the database, syncUserWithDb creates a new user', async () => {
      await checkDependencies('reset')
      let jsonData = await jfm.getObjFromFile()
      const length1 = jsonData.users.length
      const u4 = new User('Pere')
      await u4.syncUserWithDb()
      jsonData = await jfm.getObjFromFile()
      const length2 = jsonData.users.length

      expect(length2 - length1).toBe(1)
      expect(jsonData.users[length2 - 1].userName).toBe('Pere')
      expect(jsonData.users[length2 - 1].id).toBe(4)
    })
  })
  describe('Getters and Setters', () => {
    test('username', async () => {
      const userTest = new User('test')

      expect(userTest.getUserName()).toBe('test')
      userTest.setUsername('test1')
      expect(userTest.username).toBe('test1')
    })
    test('id', async () => {
      await checkDependencies('reset')
      const userTest = new User('test')
      await userTest.syncUserWithDb()
      // let jfm = new JsonFileManager();
      // let obj = await jfm.getObjFromFile();
      // console.log(obj.users.find((user)=>user.id===4)); //somehow, 'Pere' is still in the file so the expected id for 'test' is 5???

      expect(userTest.getId()).toBe(5)
      userTest.setUsername('Alex')
      await userTest.syncUserWithDb()
      expect(userTest.getId()).toBe(1)
      /*  setId is not working, plus the "test" user is given an id of 5 instead of 4, why?   */
    })
  })
})
