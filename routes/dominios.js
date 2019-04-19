const db = require('../modules/firebase');
let express = require('express');
let router = express.Router();

router.route('/dominios').get(async function(req, res) {
  const dominiosSnapshot = await db.collection('dominios').get();
  const dominios = [];
  dominiosSnapshot.forEach(dominio => {
    dominios.push({
      id: dominio.id,
      nombre: dominio.data().nombre
    });
  });
  res.json(dominios);
});

module.exports = router;