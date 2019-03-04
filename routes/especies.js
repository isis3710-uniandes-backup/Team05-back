let Especie = require('../models/especie');
let express = require('express');
let router = express.Router();

router.route('/especies').get(function(req, res) {
  Especie.find(function(err, especies) {
    if (err) {
      return res.send(err);
    }

    res.json(especies);
  });
});

router.route('/especies').post(function(req, res) {
  let especie = new Especie(req.body);

  especie.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Especie añadida' });
  })
});

router.route('/especies/:id').put(function(req, res) {
  Especie.findOne({ _id: req.params.id }, function(err, especie) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      especie[prop] = req.body[prop];
    }

    especie.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Especie actualizada'});
    });
  })
});

router.route('/especie/:id').delete(function(req, res) {
  Especie.deleteOne({ _id: req.params.id }, function(err, especie) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Especie eliminada' });
  });
});

module.exports = router;