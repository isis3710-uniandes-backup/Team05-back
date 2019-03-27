const db = require('../modules/firebase');
const express = require('express');
const router = express.Router();

router.route('/lugares').get(async function(req, res) {
  const lugaresSnapshot = await db.collection('lugares').get();
  const lugares = [];
  lugaresSnapshot.forEach(lugar => {
    console.log(lugar);
    lugares.push({
      id: lugar.id,
      pais: lugar.data().pais,
      departamento: lugar.data().departamento,
      municipio: lugar.data().municipio,
      localidad: lugar.data().localidad
    });
  });
  res.json(lugares);
});

router.route('/lugares').post(async function(req, res) {
  const lugar = {
    pais: req.body.pais,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    localidad: req.body.localidad
  }
  const docRef = await db.collection('lugares').add(lugar);

  res.json({ message: 'Lugar creado', id: docRef.id });
});

router.route('/lugar/:id').put(async function(req, res) {
  const lugar = {
    pais: req.body.pais,
    departamento: req.body.departamento,
    municipio: req.body.municipio,
    localidad: req.body.localidad
  }

  await db.collection('lugares').doc(req.params.id).set(lugar);

  res.json({ message: 'Lugar actualizado' });
});

router.route('/lugar/:id').delete(async function(req, res) {
  await db.collection('lugares').doc(req.params.id).delete();

  res.json({ message: 'Lugar eliminado' });
});

module.exports = router;
