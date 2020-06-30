'use strict';

import mongoose from '../../config/dbInfo';

const Schema = mongoose.Schema;
const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

const todoModel = mongoose.model('todo', todoSchema);

export default todoModel;