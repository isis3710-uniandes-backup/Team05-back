let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reinoSchema = new Schema({
  nombre: String
});

module.exports = mongoose.model('Reino', reinoSchema);
