let Reino = require('../models/reino');
let express = require('express');
let router = express.Router();

router.route('/reinos').get(function(req, res) {
  Reino.find(function(err, reinos) {
    if (err) {
      return res.send(err);
    }

    res.json(reinos);
  });
});

router.route('/reinos').post(function(req, res) {
  let reino = new Reino(req.body);

  reino.save(function(err) {
    if (err) {
      return res.send(err);
    }

    res.send({ message: 'Reino añadido' });
  })
});

router.route('/reinos/:id').put(function(req, res) {
  Reino.findOne({ _id: req.params.id }, function(err, reino) {
    if (err) {
      return res.send(err);
    }

    for (prop in req.body) {
      reino[prop] = req.body[prop];
    }

    reino.save(function(err) {
      if (err) {
        return res.send(err);
      }

      res.send({ message: 'Reino actualizado'});
    });
  })
});

router.route('/reinos/:id').delete(function(req, res) {
  Reino.remove({ _id: req.params.id }, function(err, reino) {
    if (err) {
      return res.send(err);
    }

    res.json({ message: 'Reino eliminado' });
  });
});

module.exports = router;