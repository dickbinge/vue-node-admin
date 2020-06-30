'use strict';

import mongoose from '../../config/dbInfo';

const Schema = mongoose.Schema;
const customerSchema = new Schema({
  code: String,
  name: String,
  account: String,
  sex: String,
  age: Number,
  phoneNum: String,
  email: String,
  address: String,
  createTime: {
    type: Date,
    default: Date.now,
  },
  updateTime: {
    type: Date,
    default: Date.now,
  },
},
{
  runSettersOnQuery: true,
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' },
});

const scustomerModel = mongoose.model('customer', customerSchema);
export default scustomerModel;