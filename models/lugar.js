let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let lugarSchema = new Schema({
  pais: String,
  departamento: String,
  municipio: String,
  localidad: String,
  latitud: Double,
  longitud: Double,
  elMin: Double,
  elMax: Double
}, { collection: 'lugares'});

module.exports = mongoose.model('Lugar', lugarSchema);
