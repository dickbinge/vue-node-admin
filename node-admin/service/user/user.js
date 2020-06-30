'use strict';

import userModel from '../../model/user/user';

const UserService = (() => {
  return class {
    async getUserList() {
      return await userModel.find();
    };
    async getUserByquery(limit, offset) {
      return await userModel.find({}).skip(Number(offset)).limit(Number(limit));
    };
    async getUserByName(username) {
      return await userModel.findOne({
        user_name: username,
      });
    };
    async getUserById(id) {
      return await userModel.findOne({
        _id: id,
      }, '-_id -__v -password');
    }
    async addUser(user) {
      return await userModel.create(user);
    };
    async updateUser(id, user) {
      return await userModel.update({
        _id: id
      }, user);
    };
    async deleteUser(id) {
      return await userModel.remove({
        _id: id,
      });
    };
  };
})();

export default new UserService();