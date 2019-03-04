let Clase = require('../models/clase');
let express = require('express');
let router = express.Router();

router.route('/clases').get(function(req, res) {
  Clase.find(function(err, clases) {
    if (err) {
      return res.send(err);
    }

    res.json(clases);
  });
});

router.route('/clases').post(function(req, res) {
  let clase = new Clase(req.body);

  clase.save(function(err, newClase) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Clase añadida' }, newClase]);
  })
});

router.route('/clases/:id').put(function(req, res) {
  Clase.findOne({ _id: req.params.id }, function(err, clase) {
    if (err) {
      return res.send(err);
    }

    if (clase === null) {
      return res.send({ message: 'Clase no existe'});
    }

    for (prop in req.body) {
      clase[prop] = req.body[prop];
    }

    clase.save(function(err, updatedClase) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Clase actualizada'}, updatedClase]);
    });
  })
});

router.route('/clases/:id').delete(function(req, res) {
  Clase.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Clase eliminada' });
  });
});

module.exports = router;