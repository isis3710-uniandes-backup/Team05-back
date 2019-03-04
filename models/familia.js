let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let familiaSchema = new Schema({
  nombre: String
}, { collection: 'familias'});

module.exports = mongoose.model('Familia', familiaSchema);
