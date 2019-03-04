let Clase = require('../models/lugar');
let express = require('express');
let router = express.Router();

router.route('/lugares').get(function(req, res) {
  Clase.find(function(err, lugares) {
    if (err) {
      return res.send(err);
    }

    res.json(lugares);
  });
});

router.route('/lugares').post(function(req, res) {
  let lugar = new Lugar(req.body);

  lugar.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Lugar añadido' });
  })
});

router.route('/lugares/:id').put(function(req, res) {
  Lugar.findOne({ _id: req.params.id }, function(err, lugar) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      lugar[prop] = req.body[prop];
    }

    lugar.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Lugar actualizado'});
    });
  })
});

router.route('/lugares/:id').delete(function(req, res) {
  Clase.deleteOne({ _id: req.params.id }, function(err, lugar) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Lugar eliminado' });
  });
});

module.exports = router;
