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
    username = "";
    id = -0;
    constructor(username) {
        //Check user if user exists already, i.e. if 
        //i have to return an existing
        if (typeof username !== "string" || username.length < 1) {
            console.log(`Invalid username`);
            return -1;
        }
        
        this.username = username;
    }
    async syncUserWithDb(){
        const jfm = new JsonFileManager();
        let obj = await jfm.getObjFromFile();
        await jfm.getObjFromFile();
        let found = obj.users.find((user) => user.userName === this.username);
        if (found !== undefined) {
            this.id = found.id;
            return;
        }
        this.id = this.getNextId();
        obj.users.push({
            "id":this.id,
            "userName":this.username
        });
        await jfm.rewriteFile(obj);
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
    setId(id) {
        if (typeof id === "number"){
            this.id = id;
        } else {
            console.log(`Bad id, cannot set`);
            return -1;
        }
    }
    async saveToDb(userObject) {
        //check this object has an id type number and a username type string
        const jfm = new JsonFileManager();
        let obj = await jfm.getObjFromFile();
        let found = obj.users.find((user) => user.id === this.id);
        if (found === undefined){
            
        }


    }
    async getNextId() {
        const jfm = new JsonFileManager();
        let obj = await jfm.getObjFromFile();
        if (obj.users.length === 0) {
            return 1;
        }
        return obj.users[length -1].id + 1;
    }
}

module.exports = User;