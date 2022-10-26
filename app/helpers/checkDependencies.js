const fs = require('fs/promises')
// Did i make trycatch hell??
async function checkDependencies (reset) {
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
  if (reset === 'reset') {
    await writeJsonFromTemplate()
    return
  }
  try {
    const filesInDir = await fs.readdir(global.appRoot)
    if (!filesInDir.includes('appData.json')) { // File doesn't exist
      await writeJsonFromTemplate()
      return
    }

    let fileData = await fs.readFile(global.appRoot + '/appData.json')
    // remember readFile returns a Buffer type
    // console.log(fileData.constructor.name);
    if (fileData.length < 1) { // exists, but i got an empty Buffer
      await writeJsonFromTemplate()
      return
    }
    try {
      fileData = JSON.parse(fileData)
      if (!Array.isArray(fileData.users) || !Array.isArray(fileData.tasks)) { // exists and its a Json, but it doesn't have the arrays i need
        await writeJsonFromTemplate()
        return
      }
    } catch (error) { // exists, but its not a valid Json
      await writeJsonFromTemplate()
      return
    }
  } catch (error) {
    console.log(error)
    console.log('Found this error when checking the dependencies, have fun debugging :)')
    process.exit()
  }
}

async function writeJsonFromTemplate () {
  try {
    const templateData = await fs.readFile(global.appRoot + '/template.json')
    await fs.writeFile(global.appRoot + '/appData.json', templateData)
    return
  } catch (error) {
    console.log('Error within writeJsonFromTemplate')
    throw error
  }
}/*
Im not catching errors from this read and write files.
Neither here nor above where its called

Ok so with this ugly catch I expect that if theres ever an error in the
writeFileFromTemplate, it will at most try again one time (if it threw inside
the little "try" of checkDependecies). In any case the bigger catch of
checkDependencies (the one that says have fun debugging) should work, show you
the error and know where it came from
*/

module.exports = checkDependencies
