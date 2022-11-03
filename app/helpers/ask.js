const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask (str) {
  return new Promise((resolve, reject) => {
    rl.setPrompt(str)
    rl.prompt()

    if (rl.listenerCount('line') > 0) {
      rl.removeAllListeners('line')
    }
    rl.on('line', (resposta) => { resolve(resposta) })
  })
}

module.exports = ask
