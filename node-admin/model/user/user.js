'use strict';

import mongoose from '../../config/dbInfo';
const Schema = mongoose.Schema;
const userSchema = new Schema({
  user_name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: String,
  avatar: String,
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

const userModel = mongoose.model('user', userSchema);

export default userModel;

