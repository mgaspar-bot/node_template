const ask = require('./ask')

async function t () {
  await ask('Write stuff\n')
  process.exit()
};
t()
