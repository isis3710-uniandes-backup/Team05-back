let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let especimenSchema = new Schema({
  descripcion: String,
  colector: ObjectId,
  lugar: ObjectId,
  ubicacion: {
    latitud: Number,
    longitud: Number
  },
  reino: ObjectId,
  clase: ObjectId,
  orden: ObjectId,
  familia: ObjectId,
  genero: ObjectId,
  especie: ObjectId
}, { collection: 'especimenes'});

module.exports = mongoose.model('Especimen', especimenSchema);
