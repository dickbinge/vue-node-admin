'use strict';

import fruitModel from '../../model/goods/fruit';

const FruitService = (() => {
  return class {
    async getFruitCount(goodsName) {
      return fruitModel.count({
        $or: [
          {
            name: { '$regex': goodsName, $options: '$i' }
          }
        ]
      });
    };
    async getFruitList(goodsName, pageNum, pageSize, sort) {
      return fruitModel.find({
        $or: [
          {
            name: {
              '$regex': goodsName,
              $options: '$i',
            },
          }
        ]
      }).skip((pageNum - 1) * pageSize)
        .limit(pageSize).sort(sort);
    };
    async addFruit(fruit) {
      return fruitModel.create(fruit);
    };
  };
})();

export default new FruitService();