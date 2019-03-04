let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let lugarSchema = new Schema({
  pais: String,
  departamento: String,
  municipio: String,
  localidad: String
}, { collection: 'lugares'});

module.exports = mongoose.model('Lugar', lugarSchema);
