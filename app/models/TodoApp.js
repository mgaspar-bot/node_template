const Task = require("./task");
const User = require(appRoot+"/models/User");
const ask = require(appRoot+'/helpers/ask')

class TodoApp {
    user = "";
    menuposition = -1;
    constructor() {
        //yes?
    }
    async init() { //this should do what whodis does more or less
        let username = "";
        do {
            username = await ask(`Please enter your username\n`);
        } while (username === ""); //the prompt always returns a string
        this.user = new User(username);
        // let userNameWasInDb = await this.user.syncUserWithDb();
        if(!(await this.user.syncUserWithDb())){
            console.log(`${username} registered correctly`);
        }
    }
    async mainMenu (){
        console.log(`Welcome ${this.user.username}`);
        let res = "";
        do {
            res = await ask(
                `Please choose an option 
                    1. Create a new task
                    2. Go to my tasks
                    0. Bye!
`);
                if (res == 1){
                    await Task.prototype.createTask(this.user.id);
                } else if (res == 2) {
                    Task.prototype.seeAll(); //podem fer que tensenyi nomes les teves
                    this.taskMenu();
                }else if (res == 3) {
                    //borraTasca(id)
                } else if (res == 4) {
                    //veure una tasca
                } else if (res == 5) {
                    
                }
        } while (res != 0)
        process.exit();
    }
    async taskMenu() {
        let res = "";
        let task = new Task();

        let indexToModify = await task.seeTask()
        
        if (indexToModify !== undefined) {
            do {
                res = await ask(
                    `What do you want to do? 
                        1. Update existing task
                        2. Erase task
                        0. Back to main menu
                        `);
                if (res == 1) {
                    await task.modify(indexToModify)
                } else if (res == 2) {
                    await task.deleteTask(indexToModify)
                }
            } while (res != 0)
            this.mainMenu();
        }
    }
}

module.exports = TodoApp;
