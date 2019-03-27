const db = require('../modules/firebase');
const Reino = require('../models/reino');
const express = require('express');
const router = express.Router();

router.route('/reinos').get(async function(req, res) {
  const reinoSnapshot = await db.collection('reinos').get();
  const reinos = [];
  reinoSnapshot.forEach((reino) => {
    reinos.push({
      id: reino.id,
      nombre: reino.data().nombre
    });
  });
  res.json(reinos);
});

router.route('/reinos').post(async function(req, res) {
  const reino = {
    nombre: req.body.nombre
  };

  const docRef = await db.collection('reinos').add(reino);

  res.json({ message: 'Reino creado', id: docRef.id });
});

router.route('/reino/:id').put(async function(req, res) {
  let reino = {};
  for (prop in req.body) {
    reino[prop] = req.body[prop];
  }

  await db.collection('reinos').doc(req.params.id).set(reino);

  return res.json({ message: 'Reino actualizado' });
});

router.route('/reino/:id').delete(async function(req, res) {
  await db.collection('reinos').doc(req.params.id).delete();

  return res.json({ message: 'Reino eliminado' });
});

module.exports = router;