const JsonFileManager = require('./JsonFileManager');

const jfm = new JsonFileManager('./prova.json');

jfm.rewriteFile("j");

var obj = jfm.getObjFromFile(this);

console.log(obj);

obj.tasks.push({"text":"si"});


jfm.rewriteFile(obj);
jfm.rewriteFile(this, obj);

