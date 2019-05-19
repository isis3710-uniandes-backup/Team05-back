const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/lugares').get(async function(req, res) {
  const lugaresSnapshot = await db.collection('lugares').get();
  const lugares = [];
  lugaresSnapshot.forEach(lugar => {
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
  if(jwt.validateToken){
    const lugar = {
      pais: req.body.pais,
      departamento: req.body.departamento,
      municipio: req.body.municipio,
      localidad: req.body.localidad
    }
    const docRef = await db.collection('lugares').add(lugar);

    res.json({ message: 'Lugar creado', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/lugar/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const lugar = {};
    for (prop in req.body) {
      lugar[prop] = req.body[prop];
    }

    await db.collection('lugares').doc(req.params.id).set(lugar, { merge: true });

    res.json({ message: 'Lugar actualizado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/lugar/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('lugares').doc(req.params.id).delete();

    res.json({ message: 'Lugar eliminado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
