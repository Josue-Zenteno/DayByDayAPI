var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
  user: String,
  email: String,
  image: String,
  message: String,
  votes: {type: Number, default: 0},
  //Aqui podria ir un parametro para los likes
  publicationdate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);