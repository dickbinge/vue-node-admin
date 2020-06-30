'use strict';

import todoService from '../../service/work/todo';

const Todo = (() => {
  return class {
    async getTodoList(ctx, next) {
      ctx.type = 'json';
      try {
        const todoListRet = await todoService.getTodoList();
        ctx.status = 200;
        ctx.body = {
          code: 200,
          msg: 'success',
          data: todoListRet,
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err.message,
        };
      }
    };
    async addTodo(ctx, next) {
      const todo = ctx.request.body;
      ctx.type = 'json';
      try {
        const retTodo = await todoService.addTodo(todo);
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: 'success',
          data: retTodo,
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err.message,
        };
      }
    };
    async updateTodo(ctx, next) {
      const id = ctx.query.id;
      const todo = ctx.request.body;
      ctx.type = 'json';
      try {
        await todoService.updateTodo(id, todo);
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: 'success',
        };
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    };
    async deleteTodo(ctx, next) {
      const { id } = ctx.query;
      ctx.type = 'json';
      try {
        await todoService.deleteTodo(id);
        ctx.status = 200;
        ctx.body = {
          code: 0,
          msg: 'success',
        };
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    }
  };
})();

export default new Todo();