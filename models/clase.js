let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let claseSchema = new Schema({
  nombre: String
}, { collection: 'clases'});

module.exports = mongoose.model('Clase', claseSchema);
