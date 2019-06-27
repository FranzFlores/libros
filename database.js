var Neode = require('neode');
var path = require('path');
const instance = Neode.fromEnv()
.withDirectory(path.join(__dirname, 'models'));

module.exports  = instance;