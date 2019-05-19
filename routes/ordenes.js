const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/ordenes').get(async function(req, res) {
  const ordenesSnapshot = await db.collection('ordenes').get();
  const ordenes = [];
  ordenesSnapshot.forEach(orden => {
    ordenes.push({
      id: orden.id,
      nombre: orden.data().nombre
    });
  });
  res.json(ordenes);
});

router.route('/ordenes').post(async function(req, res) {
  if(jwt.validateToken){
    const orden = {
      nombre: req.body.nombre
    }

    const docRef = await db.collection('ordenes').add(orden);

    res.json({ message: 'Orden creada', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/orden/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const orden = {
      nombre: req.body.nombre
    };

    await db.collection('ordenes').doc(req.params.id).set(orden);

    res.json({ message: 'Orden actualizada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/orden/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('ordenes').doc(req.params.id).delete();

    res.json({ message: 'Orden eliminada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
