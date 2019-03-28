const db = require('../modules/firebase');
let express = require('express');
let router = express.Router();

router.route('/colectores').get(async function(req, res) {
  const colectoresSnapshot = await db.collection('colectores').get();
  const colectores = [];
  colectoresSnapshot.forEach(colector => {
    colectores.push({
      id: colector.id,
      nombre: colector.data().nombre
    });
  });
  res.json(colectores);
});

router.route('/colectores').post(async function(req, res) {
  const colector = {
    nombre: req.body.nombre
  };
  const docRef = await db.collection('colectores').add(colector);

  res.json({ message: 'Colector creado', id: docRef.id });
});

router.route('/colector/:id').put(async function(req, res) {
  const colector = {
    nombre: req.body.nombre
  };
  
  await db.collection('colectores').doc(req.params.id).set(colector);

  res.json({ message: 'Colector actualizado'});
});

router.route('/colector/:id').delete(async function(req, res) {
  await db.collection('colectores').doc(req.params.id).delete();

  res.json({ message: 'Colector eliminado' });
});

module.exports = router;