'use strict';

import customerModel from '../../model/user/customer';

const UserService = (() => {
  return class {
    async getCustomerList() {
      return await customerModel.find();
    };
    async getCustomerByquery(limit, offset) {
      return await customerModel.find({}).skip(Number(offset)).limit(Number(limit));
    };
    async getCustomerByName(username) {
      return await customerModel.findOne({
        user_name: username,
      });
    };
    async getCustomerById(id) {
      return await customerModel.findOne({
        _id: id,
      }, '-_id -__v -password');
    }
    async addCustomer(user) {
      return await customerModel.create(user);
    };
    async updateCustomer(id, user) {
      return await customerModel.update({
        _id: id
      }, user);
    };
    async deleteCustomer(id) {
      return await customerModel.remove({
        _id: id,
      });
    };
  };
})();

export default new UserService();