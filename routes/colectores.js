const db = require('../modules/firebase');
const jwt = require('../utils/jwt');
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
  if(jwt.validateToken){
    const colector = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('colectores').add(colector);

    res.json({ message: 'Colector creado', id: docRef.id });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/colector/:id').put(async function(req, res) {
  if(jwt.validateToken){
    const colector = {
      nombre: req.body.nombre
    };

    await db.collection('colectores').doc(req.params.id).set(colector);

    res.json({ message: 'Colector actualizado'});
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

router.route('/colector/:id').delete(async function(req, res) {
  if(jwt.validateToken){
    await db.collection('colectores').doc(req.params.id).delete();

    res.json({ message: 'Colector eliminado' });
  }
  else{
    res.json({"message": "no autorizado"});
  }

});

module.exports = router;
