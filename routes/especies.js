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

  especie.save(function(err, newEspecie) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Especie añadida' }, newEspecie]);
  })
});

router.route('/especies/:id').put(function(req, res) {
  Especie.findOne({ _id: req.params.id }, function(err, especie) {
    if (err) {
      return res.send(err);
    }

    if (especie === null) {
      return res.send({ message: 'Especie no existe'});
    }

    for (prop in req.body) {
      especie[prop] = req.body[prop];
    }

    especie.save(function(err, updatedEspecie) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Especie actualizada'}, updatedEspecie]);
    });
  })
});

router.route('/especies/:id').delete(function(req, res) {
  Especie.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Especie eliminada' });
  });
});

module.exports = router;