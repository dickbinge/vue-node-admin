import fruitService from '../../service/goods/fruit';

const fruitController = (() => {
  return class {
    async getFruitList(ctx) {
      ctx.type = 'json';
      const { pageNum = 1, pageSize = 10, goodsName = '', sort} = ctx.request.body;
      try {
        const count = await fruitService.getFruitCount(goodsName);
        const data = await fruitService.getFruitList(goodsName, pageNum, pageSize, sort);
        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: 'success',
          data,
          totalCount: count,
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err.message,
        };
      }
    };
    async addFruit(ctx) {
      ctx.type = 'json';
      const fruit = ctx.request.body;
      try {
        await fruitService.addFruit(fruit);
        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: 'success',
        };
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.msg,
        };
      }
    };
  };
})();

export default new fruitController();