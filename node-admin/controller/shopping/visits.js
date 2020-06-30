'use strict';

class Visits {
  getBugetList(ctx) {
    const bugetList = [
      {
        code: 'allocated',
        name: '已分配',
        value: [5000, 7000, 12000, 11000, 15000, 14000],
      },
      {
        code: 'expected',
        name: '未分配',
        value: [4000, 9000, 15000, 15000, 13000, 11000],
      },
      {
        code: 'actual',
        name: '实际',
        value: [5500, 11000, 12000, 15000, 12000, 8000],
      },
    ];
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: bugetList,
    }
  };
  getShoppingInfo(ctx) {
    const lineChartData = [
      {
        code: 'newVisitis',
        iconClass: 'peoples',
        text: 'New Visits',
        iconType: 'cyan',
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
      },
      {
        code: 'messages',
        iconClass: 'message',
        text: 'Messages',
        iconType: 'blue',
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
      },
      {
        code: 'purchases',
        iconClass: 'money',
        text: 'Purchases',
        iconType: 'red',
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
      },
      {
        code: 'shoppings',
        iconClass: 'shopping',
        text: 'Shoppings',
        iconType: 'green',
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
      },
    ];
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: lineChartData,
    }
  };
  getIndustrial(ctx) {
    const industrial = [
      {
        code: 'Industries',
        name: '工业',
        value: 330,
      },
      {
        code: 'Technology',
        name: '教育',
        value: 240,
      },
      {
        code: 'Forex',
        name: '外汇',
        value: 100,
      },
      {
        code: 'Gold',
        name: '黄金',
        value: '',
      },
      {
        code: 'Other',
        name: '其他',
        value: 50,
      },
    ];
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: industrial,
    }
  };
  getConsumption(ctx) {
    const consumption = [
      {
        code: 'fish',
        name: '烤鱼',
        data: [79, 52, 200, 334, 390, 330, 220],
      },
      {
        code: 'juice',
        name: '果汁',
        data: [80, 52, 200, 334, 390, 330, 220],
      },
      {
        code: 'fruit',
        name: '水果',
        data: [30, 52, 200, 334, 390, 330, 220],
      }
    ];
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: consumption,
    };
  };
  getGoodsList(ctx) {
    ctx.type = 'json';
    ctx.status = 200;
    ctx.body = {
      code: 200,
      msg: 'success',
      data: goodsList,
    };
  };
}
export default new Visits();