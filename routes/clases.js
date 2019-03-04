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

  clase.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Clase añadido' });
  })
});

router.route('/clases/:id').put(function(req, res) {
  Clase.findOne({ _id: req.params.id }, function(err, clase) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      clase[prop] = req.body[prop];
    }

    clase.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Clase actualizado'});
    });
  })
});

router.route('/clases/:id').delete(function(req, res) {
  Clase.deleteOne({ _id: req.params.id }, function(err, clase) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Clase eliminado' });
  });
});

module.exports = router;