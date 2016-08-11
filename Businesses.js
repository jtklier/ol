var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BusinessSchema = new Schema({
  id        : Number,
  uuid      : String,
  name      : String,
  address   : String,
  address2  : String,
  city      : String,
  state     : String,
  zip       : Number,
  country   : String,
  phone     : Number,
  website   : String,
  created_at: String,
});

BusinessSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret._id;
    return ret;
  }
})

mongoose.model('Business', BusinessSchema);
