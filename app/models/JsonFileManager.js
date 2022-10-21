const fs = require('fs/promises');
const { userInfo } = require('os');
 /*
class JsonFileManager {
    constructor (path) {
        if (JsonFileManager.instance instanceof JsonFileManager) {
            console.log(`There can only be one JsonFileManager, ill give you a reference to the instance`);
            return JsonFileManager.instance
        }
        this.path = path;
        this.awaitingChanges = false;
        this.password = "";

        JsonFileManager.instance = this;
        // Object.freeze(this); //Jo el que vull es que ningu pugui tocar el path fent      .path  = "algo" ni  .password etc
    }

    getObjFromFile(password) { //pots canviar coses passant-li el teu this
        if (!password) {
            console.log(`JsonFileManager: you need to set a password so i trust you`);
            return;
        }
        
        if (this.awaitingChanges){
            console.log(`JsonFileManager: Can't give you obj, i'm waiting for changes`);
            return;
        }
        this.password = password;
        this.awaitingChanges = true;
        console.log(`JsonFileManager: password set, now i'll wait for you to make the changes`);
        return require(this.path);
    }

    async rewriteFile(password, obj) {
        if ( password !== this.password || !this.awaitingChanges) {
            console.log(`JsonFileManager: wrong password, or im not waiting for changes now`);
            return
        }
        try {
            await fs.writeFile(this.path, JSON.stringify(obj));
            this.awaitingChanges = false;
            return;
        } catch (error) {
            console.log(`JsonFileManager: I messed up the file writing, we're basically dead now`);
            console.log(error);
            return;
        } 
    }
} 


This class tries to be a singleton to manage the JSON file, it only gives you the Javascript Object from the file and 
rewrites the changed object into the same file.

To get the object you call the manager sending a password as a parameter. The object which was written at the file at that 
time is returned, and the password you sent is set. Now the rewriteFile function can be used, but you need to identify yourself
with the password.

In short: the only option you have to change the file is to call getObject, set a password and then rewriteFile with the password.

This way i feel it will be much more difficult to mess up the file inadvertently, or to lose changes.
*/

class JsonFileManager {
    constructor () {
        if (JsonFileManager.instance instanceof JsonFileManager) {
            // console.log(`There can only be one JsonFileManager, ill give you a reference to the instance`);
            return JsonFileManager.instance
        }
        this.path = appRoot +"/appData.json";

        JsonFileManager.instance = this;
        Object.freeze(this); //Jo el que vull es que ningu pugui tocar el path fent      .path  = "algo" ni  .password etc
    }

    async getObjFromFile(retried) { //pots canviar coses passant-li el teu this        
        let obj;
        try {
            obj = require(this.path);
            return obj;
            
        } catch (error) {
            console.log(`I found an error when requiring the json file, i'll rewrite the file and try again`); //It would be cool to check here for the type of error we're expecting. I mean the catch part always writes a blank json file, regardless of which error was thrown
            if (retried === true) {
                console.log(error);
                return;
            }
            try {
                await fs.writeFile(this.path, JSON.stringify({
                    "users":[],
                    "tasks":[]
                }))
            } catch (error) {
                console.log(`After failing to require the json file, an error was thrown when trying to write a blank json file:`);
                console.log(error);
            }

            return this.getObjFromFile(true);
        }   
    }

    async rewriteFile(obj) {      
        try {
            console.log(`Im going to writeFile this:`);
            console.log(obj);
            console.log(`into here`);
            console.log(this.path);
            await fs.writeFile(this.path, JSON.stringify(obj), 'utf-8');
            return;
        } catch (error) {
            console.log(`JsonFileManager: I messed up the file writing, we're basically dead now`);
            console.log(error);
            return;
        }
    }
}

module.exports = JsonFileManager;

