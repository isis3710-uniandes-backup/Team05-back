let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ordenSchema = new Schema({
  nombre: String
}, { collection: 'ordenes' });

module.exports = mongoose.model('Orden', ordenSchema);
