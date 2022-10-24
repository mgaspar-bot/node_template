const checkDependencies = require('../app/helpers/checkDependencies');
const JsonFileManager = require('../app/models/JsonFileManager');
const User = require('../app/models/User');

describe(`Classe User: `, () =>{
    describe(`Constructor`, () => {
        test(`Can be instantiated`, () => {
            const user = new User(`H`);
            expect(user).toBeInstanceOf(User);
        });
        test(`Constructor only takes valid usernames`, () => {
            expect(new User()).toBe(-1);
            expect(new User(87)).toBe(-1);
            expect(new User(``)).toBe(-1);
            expect(new User(`Pere`)).toBeInstanceOf(User);
        });
    });
    describe(`SyncUserWithDb`, () => {
        test(`If the username was already registered, puts the correct id into the instance`, async ()=> {
            await checkDependencies(); //just a lazy way to get the template data into appData.json
            let u1 = new User('Marc');
            u1.syncUserWithDb();
            expect(u1.getId()).toBe(3);
            let u2 = new User('Marçal');
            u2.syncUserWithDb();
            expect(u2.getId()).toBe(2);
            let u3 = new User('Alex');
            u3.syncUserWithDb();
            expect(u3.getId()).toBe(1);
        });
        test(`If the username wasn't already in the database, syncUserWithDb creates a new user`, () => {
            

            let u4 = new User('Pere');
            u4.syn
        })
    })
})