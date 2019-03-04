let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let colectorSchema = new Schema({
  nombre: String
}, { collection: 'colectores'});

module.exports = mongoose.model('Colector', colectorSchema);
