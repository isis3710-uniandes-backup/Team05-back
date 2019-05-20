const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/generos').get(async function(req, res) {
  const generosSnapshot = await db.collection('generos').get();
  const generos = [];
  generosSnapshot.forEach(genero => {
    generos.push({
      id: genero.id,
      nombre: genero.data().nombre
    });
  });
  res.json(generos);
});

router.route('/generos').post(async function(req, res) {
  if(jwt.validateToken){
    const genero = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('generos').add(genero);

    res.json({ message: 'Genero creado', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/genero/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const genero = {
      nombre: req.body.nombre
    }

    await db.collection('generos').doc(req.params.id).set(genero);

    res.json({ message: 'Genero actualizado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/genero/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('generos').doc(req.params.id).delete();

    res.json({ message: 'Genero eliminado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
