const db = require('../modules/firebase');
let express = require('express');
let router = express.Router();

router.route('/filos').get(async function(req, res) {
  const filosSnapshot = await db.collection('filos').get();
  const filos = [];
  filosSnapshot.forEach(filo => {
    filos.push({
      id: filo.id,
      nombre: filo.data().nombre
    });
  });
  res.json(filos);
});

module.exports = router;