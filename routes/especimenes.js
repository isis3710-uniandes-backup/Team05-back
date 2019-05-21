const db = require('../modules/firebase')
const jwt = require('../utils/jwt')
let express = require('express')
let router = express.Router()

router.route('/especimenes').get(async function (req, res) {


  let especimenesRef = db.collection('especimenes')
  for (let parameter in req.query) {
    especimenesRef = especimenesRef.where(parameter, '==', req.query[parameter])
  }
  const especimenesSnapshot = await especimenesRef.limit(100).get()
  const especimenes = []
  especimenesSnapshot.forEach(especimen => {
    especimenes.push({
      id: especimen.id,
      clase: especimen.data().clase,
      colector: especimen.data().colector,
      descripcion: especimen.data().descripcion,
      dominio: especimen.data().dominio,
      especie: especimen.data().especie,
      familia: especimen.data().familia,
      filo: especimen.data().filo,
      genero: especimen.data().genero,
      lugar: especimen.data().lugar,
      orden: especimen.data().orden,
      reino: especimen.data().reino,
      ubicacion: especimen.data().ubicacion,
      imagen: especimen.data().imagen
    })
  })
  res.json(especimenes)
})

router.route('/especimen/:id').get(async function (req, res) {
  const especimen = await db.collection('especimenes').doc(req.params.id).get()
  res.json(especimen.data())

})

router.route('/especimenes').post(async function (req, res) {

  if (true) {
    const especimen = {
      clase: req.body.clase,
      colector: req.body.colector || '',
      descripcion: req.body.descripcion || '',
      dominio: req.body.dominio,
      especie: req.body.especie,
      familia: req.body.familia,
      filo: req.body.filo,
      genero: req.body.genero,
      lugar: req.body.lugar || '',
      orden: req.body.orden,
      reino: req.body.reino,
      ubicacion: req.body.ubicacion || '',
      imagen: req.body.imagen
    }
    const docRef = db.collection('especimenes').add(especimen)

    res.json({ message: 'Espécimen creado', id: docRef.id })
  } else {
    res.json({ 'message': 'no autorizado' })
  }
})

router.route('/especimen/:id').put(async function (req, res) {
  if (jwt.validateToken) {
    const especimen = {}
    for (prop in req.body) {
      especimen[prop] = req.body[prop]
    }

    await db.collection('especimenes').doc(req.params.id).set(especimen, { merge: true })

    res.json({ message: 'Espécimen actualizado' })
  } else {
    res.json({ 'message': 'no autorizado' })
  }
})

router.route('/especimen/:id').delete(async function (req, res) {
  if (jwt.validateToken) {
    await db.collection('especimenes').doc(req.params.id).delete()

    res.json({ message: 'Espécimen eliminado' })
  } else {
    res.json({ 'message': 'no autorizado' })
  }
})

module.exports = router
