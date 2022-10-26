const JsonFileManager = require("./JsonFileManager");
/*
Attributes:
- id
- name

Methods:
- constructor(name)
- getId
- getName
- setId
- setName
- save
*/
class User {
    constructor(username) {
        //Check user if user exists already, i.e. if 
        //i have to return an existing
        
        if (!username  || typeof username !== "string" || username.length < 1) {
            // console.log(`Invalid username in constructor`);
            throw new Error(`invalid username in constructor`);
        }
        
        this.username = username;
        this.id;
        return this;
    }
    async syncUserWithDb(){ //this method should only be used after the log in, when you received the username
        //if the username doesnt exist, it creates it in db*--
        //if it exists, just fetch the correct id.
        const jfm = new JsonFileManager();
        let obj = await jfm.getObjFromFile();
        let found = obj.users.find((user) => user.userName === this.username);
        if (found !== undefined) {
            this.id = found.id;
            return;
        }
        this.id = await this.getNextId();
        // obj.users.push({
        //     "id":this.id,
        //     "userName":this.username
        // });
        // await jfm.rewriteFile(obj);
        await this.saveToDb();
    }
    getId() {
        return this.id;
    }
    getUserName () {
        return this.username;
    }
    setUsername(username) {
        if (typeof username === "string"){
            this.username = username;
        } else {
            console.log(`Bad username, cannot set`);
            return -1;
        }
    }
    setId(id) { //i'm not sure this should have a setter
        if (typeof id === "number"){
            this.id = id;
        } else {
            console.log(`Bad id, cannot set`);
            return -1;
        }
    }
    async saveToDb() {//this just writes the  'this' runtime object to memory. If the a user with the same id already existed, it just changes the username
        let jfm = new JsonFileManager();
        let obj = jfm.getObjFromFile();

        let found = obj.users.find((user) => user.id === this.id);
        if (found === undefined) { //if the id is not in the db, just add it to the file
            obj.users.push({
                "id":this.id,
                "userName":this.username                
            });
            await jfm.rewriteFile(obj);
            return;
        }
        //if the id already exists, just change the username
        obj.users = obj.users.map((user) => {
            if(user.id === this.id) {
                user.userName = this.username;
            }
        })
        await jfm.rewriteFile(obj);
    }
    async getNextId() {
        const jfm = new JsonFileManager();
        let obj = await jfm.getObjFromFile();
        if (obj.users.length === 0) {
            return 1;
        }
        return obj.users[obj.users.length -1].id + 1;
    }
}

module.exports = User;