let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let colectorSchema = new Schema({
  nombre: String
}, { collection: 'generos'});

module.exports = mongoose.model('Genero', colectorSchema);