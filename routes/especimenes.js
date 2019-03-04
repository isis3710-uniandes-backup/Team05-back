let Especimen = require('../models/especimen');
let express = require('express');
let router = express.Router();

router.route('/especimenes').get(function(req, res) {
  Especimen.find(function(err, especimenes) {
    if (err) {
      return res.send(err);
    }

    res.json(especimenes);
  });
});

router.route('/especimenes').post(function(req, res) {
  let especimen = new Especimen(req.body);

  especimen.save(function(err, especimen) {
    if (err) {
      return res.send(err);
    }

    res.send([{ message: 'Espécimen añadido' }, especimen]);
  })
});

router.route('/especimenes/:id').put(function(req, res) {
  Especimen.findOne({ _id: req.params.id }, function(err, especimen) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      especimen[prop] = req.body[prop];
    }

    especimen.save(function(err, especimen) {
      if (err) {
        return res.send(err);
      }

      res.send([{ message: 'Espécimen actualizado'}, especimen]);
    });
  })
});

router.route('/especimenes/:id').delete(function(req, res) {
  Especimen.deleteOne({ _id: req.params.id }, function(err) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Espécimen eliminado' });
  });
});

module.exports = router;
