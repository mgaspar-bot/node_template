const User = require(appRoot+"/models/User");

const ask = require(appRoot+'/helpers/ask')

class TodoApp {
    user = "";
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
                    await createTask(id);
                } else if (res == 2) {
                    //modificaTasca(id)
                }else if (res == 3) {
                    //borraTasca(id)
                } else if (res == 4) {
                    //veure una tasca
                } else if (res == 5) {
                    console.log(await seeAllTasksId(id));
                }
        } while (res != 0)
        process.exit();
    }
}
