require('../app/app'); //the only purpose of this require is to set global.appRoot
const checkDependencies = require('../app/helpers/checkDependencies');
const JsonFileManager = require('../app/models/JsonFileManager');


const User = require('../app/models/User');

var jfm = new JsonFileManager();

describe(`Classe User: `, () =>{
    describe(`Constructor`, () => {
        test(`Can be instantiated`, () => {
            const user = new User(`H`);
            expect(user).toBeInstanceOf(User);
        });
        test(`Constructor only takes valid usernames`, () => {
            try {
                new User();
            } catch (error) {
                expect(error.message).toBe(`invalid username in constructor`);
            }
        });
        test(`Constructor only takes valid usernames`, () => {
            try {
                new User(87);
            } catch (error) {
                expect(error.message).toBe(`invalid username in constructor`);
            }
        });
        test(`Constructor only takes valid usernames`, () => {
            try {
                new User("");
            } catch (error) {
                expect(error.message).toBe(`invalid username in constructor`);
            }
        });
        test(`Constructor only takes valid usernames`, () => {
            expect(new User(`Pere`)).toBeInstanceOf(User);
        });
    });
    describe(`SyncUserWithDb`, () => {
        test(`If the username was already registered, puts the correct id into the instance`, async ()=> {
            await checkDependencies("reset");
            let u1 = new User('Marc');
            await u1.syncUserWithDb();
            expect(u1.getId()).toBe(3);
            let u2 = new User('Marçal');
            await u2.syncUserWithDb();
            expect(u2.getId()).toBe(2);
            let u3 = new User('Alex');
            await u3.syncUserWithDb();
            expect(u3.getId()).toBe(1);
        });
        test(`If the username wasn't already in the database, syncUserWithDb creates a new user`, async () => {
            await checkDependencies("reset");
            let jsonData = await jfm.getObjFromFile();
            let length1 = jsonData.users.length;
            let u4 = new User('Pere');
            await u4.syncUserWithDb();
            jsonData = await jfm.getObjFromFile();
            let length2 = jsonData.users.length;
            
            expect(length2 - length1).toBe(1);
            expect(jsonData.users[length2-1].userName).toBe(`Pere`);
            expect(jsonData.users[length2 -1].id).toBe(4)
        })
    });
    describe(`Getters and Setters`, () => {
       
        test(`username`, async () => {
            await checkDependencies("reset");
            let userTest = new User(`test`);
            await userTest.syncUserWithDb();

            expect(userTest.getUserName()).toBe(`test`);
            userTest.setUsername(`test1`);
            expect(userTest.username).toBe(`test1`);
        });
        test('id', async ()=> {
            await checkDependencies("reset");
            let userTest = new User(`test`);
            await userTest.syncUserWithDb();
            

            expect(userTest.getId()).toBe(5);
            expect(userTest.setId("patata")).toBe(-1);
            expect(userTest.setId(1)).toBe(-1)
            expect(userTest.setId(-2)).toBe(-1);
            expect(userTest.getId()).toBe(5);
            /*
            setId is not working, plus the "test" user is given an id of 5 instead of 4, why?
            */
        })
    })
})
