import Router from 'koa-router';
import userController from '../controller/user/user';
import shoppingController from '../controller/shopping/visits';
import goodsController from '../controller/goods/fruit';
import todoController from '../controller/work/todo';
import articleController from '../controller/work/article';

const router = new Router();

// user
router.post('/sys/user/list', userController.getAllUser);
router.post('/sys/auth/login', userController.login);
router.post('/sys/user', userController.register);
router.put('/sys/user', userController.updateUser);
router.get('/sys/auth/userInfo', userController.getUserInfo);
router.delete('/sys/user', userController.deleteUser);

// shopping
router.get('/sys/shopping/bugetList', shoppingController.getBugetList);
router.get('/sys/shopping/infoList', shoppingController.getShoppingInfo);
router.get('/sys/shopping/industrial', shoppingController.getIndustrial);
router.get('/sys/shopping/consumption', shoppingController.getConsumption);

// goods
router.post('/sys/goods/goodslist', goodsController.getFruitList);
router.post('/sys/goods/fruit', goodsController.addFruit);

// work/todo
router.post('/sys/work/todoList', todoController.getTodoList);
router.post('/sys/work/todo', todoController.addTodo);
router.put('/sys/work/todo', todoController.updateTodo);
router.delete('/sys/work/todo', todoController.deleteTodo);

// work/article
router.get('/sys/work/article', articleController.getArticleList);
router.post('/sys/work/article', articleController.addArticle);
export default router;