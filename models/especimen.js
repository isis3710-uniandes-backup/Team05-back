let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ColectorSchema = require('colector');

let especimenSchema = new Schema({

  descripcion: String,
  subEspecie: String,
  colector: ColectorSchema

}, { collection: 'especimenes'});

module.exports = mongoose.model('Especimen', especimenSchema);
