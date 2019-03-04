let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let reinoSchema = new Schema({
  nombre: String
}, { collection: 'reinos' });

module.exports = mongoose.model('Reino', reinoSchema);
