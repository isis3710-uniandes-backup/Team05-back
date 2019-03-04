let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let especimenSchema = new Schema({

  descripcion: String,
  subEspecie: String,
  colector: { $oid: String },
  lugar: { $oid: String },
  ubicación: {
    latitud: Number,
    longitud: Number
  },
  reino: { $oid: String },
  clase: { $oid: String},
  orden: { $oid: String},
  familia: { $oid: String},
  genero: { $oid: String },
  especie: { $oid: String }
}, { collection: 'especimenes'});

module.exports = mongoose.model('Especimen', especimenSchema);
