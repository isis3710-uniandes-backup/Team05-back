let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let colectorSchema = new Schema({
  nombre: String
}, { collection: 'familias'});

module.exports = mongoose.model('Familia', colectorSchema);
