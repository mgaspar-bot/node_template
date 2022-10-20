const CONSTANTS = require('./constants.js')
const JsonData = require('../Models/appData.json');
const readline = require('readline');
const rl = readline.createInterface( {
	input : process.stdin,
	output : process.stdout
});

function ask (str) {
	return new Promise ( (res, rej) => {
		rl.setPrompt(str);
		rl.prompt();
		rl.on('line', (resposta) => {res(resposta)});
    })
}

function getDate() {
 const date = new Date()
 const currentDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`

 return currentDate
}

async function createTask () {
let task = ""
let taskId = JsonData.lenght +1

task = await ask(
    `Type your task :)`
);

let taskToPush = {
    "task_id" : taskId,
    "creator_id": "",
    "description": task,
    "create_date": getDate(),
    "status": CONSTANTS.STATUS_TODO,
    "closed_date": ""
}

console.log(taskToPush)

}

createTask ()