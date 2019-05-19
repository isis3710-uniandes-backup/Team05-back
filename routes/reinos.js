const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/reinos').get(async function(req, res) {
  const reinosSnapshot = await db.collection('reinos').get();
  const reinos = [];
  reinosSnapshot.forEach(reino => {
    reinos.push({
      id: reino.id,
      nombre: reino.data().nombre
    });
  });
  res.json(reinos);
});

router.route('/reinos').post(async function(req, res) {
  if(jwt.validateToken){
    const reino = {
      nombre: req.body.nombre
    };

    const docRef = await db.collection('reinos').add(reino);

    res.json({ message: 'Reino creado', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/reino/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const reino = {
      nombre: req.body.nombre
    };

    await db.collection('reinos').doc(req.params.id).set(reino);

    res.json({ message: 'Reino actualizado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/reino/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('reinos').doc(req.params.id).delete();

    res.json({ message: 'Reino eliminado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
