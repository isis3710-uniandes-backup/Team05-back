let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let especimenSchema = new Schema({

  descripcion: String,
  subEspecie: String,
  colector: int,
  reino: int,
  orden:int,
  clase: int,
  lugar: int,
  especie: int,
  familia: int,
  genero: int

}, { collection: 'especimenes'});

module.exports = mongoose.model('Especimen', especimenSchema);
