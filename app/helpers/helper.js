const CONSTANTS = require(appRoot + '/helpers/constants.js')
const JsonData = require(appRoot + '/appData.json');
const JsonFileManager = require(appRoot + '/models/JsonFileManager');
const jfm = new JsonFileManager()

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
let taskId = JsonData.tasks.length +1

task = await ask(
    `Type your task :)`
);


let obj = jfm.getObjFromFile()

obj.tasks.push({
    "task_id" : taskId,
    "creator_id": "",
    "description": task,
    "create_date": getDate(),
    "status": CONSTANTS.STATUS_TODO,
    "closed_date": ""
   })

jfm.rewriteFile(obj)
process.exit()
}

module.exports = createTask()