const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/especies').get(async function(req, res) {

  const especiesSnapshot = await db.collection('especies').get();
  const especies = [];
  especiesSnapshot.forEach(especie => {
    especies.push({
      id: especie.id,
      nombre: especie.data().nombre
    });
  });
  res.json(especies);
});

router.route('/especies').post(async function(req, res) {
  if(jwt.validateToken){
    const especie = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('especies').add(especie);

    res.json({ message: 'Especie creada', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/especie/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const especie = {
      nombre: req.body.nombre
    };

    await db.collection('especies').doc(req.params.id).set(especie);

    res.json({ message: 'Especie actualizada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/especie/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('especies').doc(req.params.id).delete();

    res.json({ message: 'Especie eliminada' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
