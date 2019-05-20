const db = require('../modules/firebase');
const express = require('express');
const jwt = require('../utils/jwt');
const router = express.Router();

router.route('/dominios').get(async function(req, res) {
  const dominiosSnapshot = await db.collection('dominios').get();
  const dominios = [];
  dominiosSnapshot.forEach(dominio => {
    dominios.push({
      id: dominio.id,
      nombre: dominio.data().nombre
    });
  });
  res.json(dominios);
});

router.route('/dominios').post(async function(req, res) {
  if (jwt.validateToken) {
    const dominio = {
      nombre: req.body.nombre
    };
    const docRef = await db.collection('dominios').add(dominio);

    res.json({ message: 'Dominio creado', id: docRef.id });
  } else {
    res.json({ message: "no autorizado" });
  }
});

module.exports = router;