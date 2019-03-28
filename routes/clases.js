const db = require('../modules/firebase');
let express = require('express');
let router = express.Router();

router.route('/clases').get(async function(req, res) {
  const clasesSnapshot = await db.collection('clases').get();
  const clases = [];
  clasesSnapshot.forEach(clase => {
    clases.push({
      id: clase.id,
      nombre: clase.data().nombre
    });
  });
  res.json(clases);
});

router.route('/clases').post(async function(req, res) {
  const clase = {
    nombre: req.body.nombre
  };
  const docRef = await db.collection('clases').add(clase);

  res.json({ message: 'Clase creada', id: docRef.id });
});

router.route('/clase/:id').put(async function(req, res) {
  const clase = {
    nombre: req.body.nombre
  };
  
  await db.collection('clases').doc(req.params.id).set(clase);

  res.json({ message: 'Clase actualizada'});
});

router.route('/clase/:id').delete(async function(req, res) {
  await db.collection('clases').doc(req.params.id).delete();

  res.json({ message: 'Clase eliminada' });
});

module.exports = router;