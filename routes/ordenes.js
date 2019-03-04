let Orden = require('../models/orden');
let express = require('express');
let router = express.Router();

router.route('/ordenes').get(function(req, res) {
  Orden.find(function(err, ordenes) {
    if (err) {
      return res.send(err);
    }

    res.json(ordenes);
  });
});

router.route('/ordenes').post(function(req, res) {
  let orden = new Orden(req.body);

  orden.save(function(err, orden) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Orden añadida'}, orden]);
  })
});

router.route('/ordenes/:id').put(function(req, res) {
  Orden.findOne({ _id: req.params.id }, function(err, orden) {
    if (err) {
      return res.send(err);
    }

    if (orden === null) {
      return res.send({ message: 'Orden no existe'});
    }

    for (prop in req.body) {
      orden[prop] = req.body[prop];
    }

    orden.save(function(err, orden) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Orden actualizada'}, orden]);
    });
  })
});

router.route('/ordenes/:id').delete(function(req, res) {
  Orden.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Orden eliminada' });
  });
});

module.exports = router;