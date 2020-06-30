'use strict';

import mongoose from '../../config/dbInfo';

const Schema = mongoose.Schema;
const fruitSchema = new Schema({
  code: String,  // 编号代码
  name: String,  // 名称
  make: String,  // 产地
  weight: Number, // 重量
  hotTime: String,  // 热销时间
  price: Number,  // 单价
  sweetness: String, // 甜度
  organic: Boolean, // 是否有机食品
  pickTime: String,  // 采摘时间
  nourish: String, // 营养价值
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
  timestamps: { createdAt: 'createTime', updatedAt: 'updateTime' }
});

const fruitModel = mongoose.model('fruit', fruitSchema);
export default fruitModel;