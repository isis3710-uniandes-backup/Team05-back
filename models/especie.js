let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let colectorSchema = new Schema({
  nombre: String
}, { collection: 'especies'});

module.exports = mongoose.model('Especie', colectorSchema);
