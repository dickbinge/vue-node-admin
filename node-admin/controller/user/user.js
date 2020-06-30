'use strict';

import userService from '../../service/user/user';
import crypto from 'crypto';

const encryption = (password) => {
  return Md5(password);
};
const Md5 = (password) => {
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('base64');
};

const User = (() => {
  return class {
    async login(ctx, next) {
      const user = ctx.request.body;
      ctx.type = 'json';
      const { username, password } = user;
      try {
        const userRet = await userService.getUserByName(username);
        console.log(user);
        ctx.status = 200;
        if (userRet) {
          const newpassword = encryption(password);
          if (userRet.password === newpassword) {
            ctx.body = {
              code: 0,
              msg: '登录成功！',
              data: userRet,
            }
          } else {
            ctx.body = {
              code: 401,
              msg: '密码错误，请重新输入!',
            }
          }
        } else {
          ctx.body = {
            code: 401,
            msg: '用户名不存在！',
          }
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    };
    async register(ctx, next) {
      const user = ctx.request.body;
      ctx.type = 'json';
      const { username, password } = user;
      try {
        const item = await userService.getUserByName(username);
        ctx.status = 200;
        if (item) {
          ctx.body = {
            code: 401,
            msg: '当前用户名已存在！',
          }
        } else {
          user.password = encryption(password);
          user.user_name = username;
          console.log(user);
          const retUser =  await userService.addUser(user);
          ctx.body = {
            code: 0,
            msg: 'success',
            data: retUser,
          };
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    };
    async getAllUser(ctx, next) {
      console.log(ctx);
      ctx.type = 'json';
      const { limit = 20, offset = 0 } = ctx.query;
      try {
        const userList = await userService.getUserByquery(limit, offset);
        ctx.status = 200;
        ctx.body = {
          code: 0,
          data: userList,
        }
      } catch (err) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: err,
        };
      }
    };
    async getUserInfo(ctx, next) {
      const id = ctx.accept.headers['x-token'];
      ctx.type = 'json';
      try {
        const info = await userService.getUserById(id);
        ctx.status = 200;
        if (!info) {
          ctx.body = {
            code: 401,
            msg: '未找到当前用户',
          }
        } else {
          ctx.body = {
            code: 0,
            data: info,
          }
        }
      } catch (error) {
        ctx.status = 500;
        ctx.body = {
          code: 500,
          msg: error.message,
        };
      }
    };
    async updateUser(ctx, next) {
      const id = ctx.params.id;
      const user = ctx.request.body;
      ctx.type = 'json';
      try {
        await userService.updateUser(id, user);
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
    async deleteUser(ctx, next) {
      const id = ctx.params.id;
      ctx.type = 'json';
      try {
        await userService.deleteUser(id);
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
  }
})();

export default new User();