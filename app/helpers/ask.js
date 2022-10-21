const readline = require('readline');
const rl = readline.createInterface( {
	input : process.stdin,
	output : process.stdout
});
function ask (str) {
	return new Promise ( (res, rej) => {
		rl.setPrompt(str);
		rl.prompt();

        if (rl.listenerCount('line') > 0) {//Just trying to avoid a warning which appeared when you answered a lot of prompts
            rl.removeAllListeners('line');
        }//It would be cool to reuse the same listener over and over, but i dont know how to do it

        rl.on('line', (resposta) => {res(resposta)});
    })
}

module.exports = ask;