'use strict';

import articleService from '../../service/work/article';

const Article = (() => {
  return class {
    async getArticleList(ctx, next) {
      ctx.type = 'json';
      try {
        const articleList = await articleService.getArticleList();
        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: 'success',
          data: articleList,
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err.message,
        };
      }
    };
    async addArticle(ctx, next) {
      ctx.type = 'json';
      const article = ctx.request.body;
      try {
        const retArticle = await articleService.addArticle(article);
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: 'success',
          data: retArticle,
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err.message,
        };
      }
    };
  };
})();

export default new Article();