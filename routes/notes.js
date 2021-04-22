var express = require('express');
var mongoose = require('mongoose');
var Note = require('../models/Note.js');

var router = express.Router();
var db = mongoose.connection;

/* GET notes listing ordered by publicationdate */
router.get('/', function (req, res) {
  Note.find().sort('-publicationdate').exec(function(err, posts) {
    if (err) res.status(500).send(err);
    else res.status(200).json(posts);
  });
});

/* GET notes listing ordered by number of votes */
router.get('/votes', function (req, res) {
  Note.find().sort('-votes').exec(function(err, posts) {
    if (err) res.status(500).send(err);
    else res.status(200).json(posts);
  });
});

/* GET all notes from an user by user Email */
router.get('/all/:email', function (req, res) {
  Note.find({'email':req.params.email}).sort('-publicationdate').exec(function (err, notes) {
      if (err) res.status(500).send(err);
      else res.status(200).json(notes);
    });
});

/* POST a new note*/
router.post('/', function (req, res) {
  Note.create(req.body, function (err, noteinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/* PUT an existing note */
router.put('/:id', function (req, res) {
  Note.findByIdAndUpdate(req.params.id, req.body, function (err, noteinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

/* DELETE an existing note */
router.delete('/:id', function (req, res) {
  Note.findByIdAndDelete(req.params.id, function (err, noteinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

module.exports = router;