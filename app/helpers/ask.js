const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
readline.emitKeypressEvents(process.stdin)
if (process.stdin.isTTY) process.stdin.setRawMode(true) // formula magica que cal posar pq funcioni

function ask (str) {
  return new Promise((resolve, reject) => {
    rl.setPrompt(str)
    rl.prompt()

    if (rl.listenerCount('line') > 0) { // Just trying to avoid a warning which appeared when you answered a lot of prompts
      rl.removeAllListeners('line')
    }// It would be cool to reuse the same listener over and over, but i dont know how to do it
    if (process.stdin.listenerCount > 0) {
      process.stdin.removeAllListeners('keypress')
    }
    rl.on('line', (resposta) => { resolve(resposta) })
    process.stdin.on('keypress', (str, key) => {
      // console.log(key);
      if (key.name === 'escape') {
        console.log('Escape was pressed')
      }
    })
  })
}

module.exports = ask
