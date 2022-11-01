const path = require('path')
global.appRoot = path.resolve(__dirname)

// const User = require('./models/User')
const checkDependencies = require(appRoot + '/helpers/checkDependencies.js')
const TodoApp = require('./models/TodoApp')

/*
Creeu una aplicació que permeti portar un llistat de tasques per fer. Ha de contemplar l'opció d'afegir tasques, llistar-les i mostrar
el seu estat (pendents, en execució o acabades) i l'hora d'inici i final de la tasca, així com l'usuari/ària que la va donar d'alta
S'ha d'utilitzar per a la consola i ha de contenir les següents opcions: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les
tasques o llistar una tasca específica.
*/

checkDependencies().then(async () => {
  // console.log(`I'm in the .then`);
  const app = new TodoApp()

  await app.init()
  await app.mainMenu()
})
