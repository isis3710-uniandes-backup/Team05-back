let Familia = require('../models/familia');
let express = require('express');
let router = express.Router();

router.route('/familias').get(function(req, res) {
  Familia.find(function(err, familias) {
    if (err) {
      return res.send(err);
    }

    res.json(familias);
  });
});

router.route('/familias').post(function(req, res) {
  let familia = new Familia(req.body);

  familia.save(function(err, newFamilia) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Familia añadida' }, newFamilia]);
  })
});

router.route('/familias/:id').put(function(req, res) {
  Familia.findOne({ _id: req.params.id }, function(err, familia) {
    if (err) {
      return res.send(err);
    }

    if (familia === null) {
      return res.send({ message: 'Familia no existe'});
    }

    for (prop in req.body) {
      familia[prop] = req.body[prop];
    }

    familia.save(function(err, updatedFamilia) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Familia actualizada'}, updatedFamilia]);
    });
  })
});

router.route('/familias/:id').delete(function(req, res) {
  Familia.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Familia eliminada' });
  });
});

module.exports = router;