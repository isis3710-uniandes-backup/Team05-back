let Genero = require('../models/genero');
let express = require('express');
let router = express.Router();

router.route('/generos').get(function(req, res) {
  Genero.find(function(err, generos) {
    if (err) {
      return res.send(err);
    }

    res.json(generos);
  });
});

router.route('/generos').post(function(req, res) {
  let genero = new Genero(req.body);

  genero.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Genero añadido' }, genero]);
  })
});

router.route('/generos/:id').put(function(req, res) {
  Genero.findOne({ _id: req.params.id }, function(err, genero) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      genero[prop] = req.body[prop];
    }

    genero.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Genero actualizada'}, genero]);
    });
  })
});

router.route('/generos/:id').delete(function(req, res) {
  Genero.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Genero eliminado' });
  });
});

module.exports = router;