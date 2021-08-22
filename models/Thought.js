const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
  Thought: {
    type: String,
    maxlength: 280,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
    
  },
  username: {
    type: String,
    required: true, 
  }

});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;