// User.js
var mongoose = require('mongoose');  
var TimeSchema = new mongoose.Schema({  
  servertime: Date
});
mongoose.model('Time', TimeSchema);
module.exports = mongoose.model('Time');