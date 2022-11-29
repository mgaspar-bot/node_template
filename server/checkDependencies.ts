require('./db/createdb')

function checkDependencies () : Promise<void> {
    return new Promise((resolve, reject) => {
        if (!(process.env.DB_USERNAME && process.env.DB_PASSWORD && process.env.AUTH_SECRET) ) {
            reject(`.env file not parsed correctly, or didn't have the expected properties`)
        }
    });
}

module.exports = checkDependencies;