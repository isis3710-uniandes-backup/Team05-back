const db = require('../modules/firebase');
let express = require('express');
let router = express.Router();

router.route('/especimenes').get(async function(req, res) {
  let especimenesRef = db.collection('especimenes');
  if (req.query.clase) {
    especimenesRef = especimenesRef.where('clase', '==', req.query.clase);
  }
  const especimenesSnapshot = await especimenesRef.limit(20).get();
  const especimenes = [];
  especimenesSnapshot.forEach(especimen => {
    especimenes.push({
      id: especimen.id,
      clase: especimen.data().clase,
      colector: especimen.data().colector,
      descripcion: especimen.data().descripcion,
      especie: especimen.data().especie,
      familia: especimen.data().familia,
      genero: especimen.data().genero,
      lugar: especimen.data().lugar,
      orden: especimen.data().orden,
      reino: especimen.data().reino,
      ubicacion: especimen.data().ubicacion,
      imagen: especimen.data().imagen
    });
  });
  res.json(especimenes);
});

router.route('/especimenes').post(async function(req, res) {
  const especimen = {
    clase: req.body.clase,
    colector: req.body.colector,
    descripcion: req.body.descripcion,
    especie: req.body.especie,
    familia: req.body.familia,
    genero: req.body.genero,
    lugar: req.body.lugar,
    orden: req.body.orden,
    reino: req.body.reino,
    ubicacion: req.body.ubicacion,
    imagen: req.body.imagen
  };
  const docRef = db.collection('especimenes').add(especimen);

  res.json({ message: 'Espécimen creado', id: docRef.id });
});

router.route('/especimen/:id').put(async function(req, res) {
  const especimen = {};
  for (prop in req.body) {
    especimen[prop] = req.body[prop];
  }

  await db.collection('especimenes').doc(req.params.id).set(especimen, { merge: true });

  res.json({ message: 'Espécimen actualizado' });
});

router.route('/especimen/:id').delete(async function(req, res) {
  await db.collection('especimenes').doc(req.params.id).delete();

  res.json({ message: 'Espécimen eliminado' });
});

module.exports = router;
