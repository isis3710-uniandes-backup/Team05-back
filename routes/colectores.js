let Colector = require('../models/colector');
let express = require('express');
let router = express.Router();

router.route('/colectores').get(function(req, res) {
  Colector.find(function(err, colectores) {
    if (err) {
      return res.send(err);
    }

    res.json(colectores);
  });
});

router.route('/colectores').post(function(req, res) {
  let colector = new Colector(req.body);

  colector.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Colector añadido' });
  })
});

router.route('/colectores/:id').put(function(req, res) {
  Colector.findOne({ _id: req.params.id }, function(err, colector) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      colector[prop] = req.body[prop];
    }

    colector.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Colector actualizado'});
    });
  })
});

router.route('/colectores/:id').delete(function(req, res) {
  Colector.deleteOne({ _id: req.params.id }, function(err, colector) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Colector eliminado' });
  });
});

module.exports = router;