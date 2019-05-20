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

router.route('/filos').post(async function(req, res) {
  if (jwt.validateToken) {
    const filo = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('filos').add(filo);

    res.json({message: 'Filo creado', id: docRef.id});
  } else {
    res.json({ message: "no autorizado" });
  }
});

module.exports = router;