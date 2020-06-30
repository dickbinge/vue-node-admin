import articleModel from '../../model/work/article';

const articleService = (() => {
  return class {
    async getArticleList() {
      return await articleModel.find();
    };
    async addArticle(article) {
      return await articleModel.create(article);
    }
  };
})();

export default new articleService();