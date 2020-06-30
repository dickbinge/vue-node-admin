'use strict';

import mongoose from 'mongoose';
import chalk from 'chalk';

const db_url = 'mongodb://localhost/course_db';

mongoose.connect(db_url, {
  native_parser: true,
  poolSize: 5,
  promiseLibrary: global.Promise,
  auto_reconnect: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
/**
* 连接成功
*/
mongoose.connection.on('connected', function () {
  console.log(chalk.green('Mongoose connection success to ' + db_url));
});

/**
* 连接异常
*/
mongoose.connection.on('error',function (err) {
  console.log(chalk.red('Mongoose connection error: ' + err));
});

/**
* 连接断开
*/
mongoose.connection.on('disconnected', function () {
  console.log(chalk.red('Mongoose connection disconnected'));
});

export default mongoose;