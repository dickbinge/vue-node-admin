import todoModel from '../../model/work/todo';

const TodoService = (() => {
  return class {
    async getTodoList() {
      return await todoModel.find();
    };
    async addTodo(todo) {
      return await todoModel.create(todo);
    };
    async updateTodo(id, todo) {
      return await todoModel.update({
        _id: id,
      }, todo);
    };
    async deleteTodo(id) {
      return await todoModel.remove({
        _id: id,
      });
    };
  };
})();

export default new TodoService();