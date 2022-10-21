const fs = require('fs/promises')

async function checkDependencies() {
    /*
    Check if json file exists
    if not, copy template

    Possible cases: 
        file appData.json doesn't exist
        exists, but it's empty
        exists, but contains random shit
            not a Json
            a Json without the right structure (properties "users" and "tasks" with arrays in them)
    */
    try {
        const filesInDir = await fs.readdir(global.appRoot);
        if (!filesInDir.includes("appData.json")){                     //File doesn't exist
            await writeJsonFromTemplate();
            return;
        }
        
        let fileData = await fs.readFile(global.appRoot + '/appData.json');
        //remember readFile returns a Buffer type
        // console.log(fileData.constructor.name);
        if (fileData.length < 1 ) {                        //exists, but i got an empty Buffer
            await writeJsonFromTemplate();
            return;
        }
        try {
            fileData = JSON.parse(fileData);
            if (! Array.isArray(fileData.users) || !Array.isArray(fileData.tasks)) { //exists and its a Json, but it doesn't have the arrays i need
                await writeJsonFromTemplate();
                return;
            }
            
        } catch (error) {                                                                 //exists, but its not a valid Json
            await writeJsonFromTemplate();
            return;
        }
        
    } catch (error) {
        console.log(error);
        console.log(`Found this error when checking the dependencies, have fun debugging :)`);
        process.exit();
    }
}

async function writeJsonFromTemplate() {
    try {
        const templateData = await fs.readFile(global.appRoot+'/template.json');
        await fs.writeFile(global.appRoot + '/appData.json', templateData);
        return;
        
    } catch (error) {
        console.log(`Error within writeJsonFromTemplate`);
        throw error;
    }
    
}

module.exports = checkDependencies;