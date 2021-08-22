const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: /.+\@.+\..+/,
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}]

});

const User = model('User', UserSchema);

module.exports = User;