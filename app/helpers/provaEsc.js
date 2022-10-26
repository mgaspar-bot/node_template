const ask = require('./ask');

async function t () {
    let o =  await ask(`Write stuff\n`);
    process.exit();
};
t();