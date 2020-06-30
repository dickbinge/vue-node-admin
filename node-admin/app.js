'use strict';

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import mongoose from './config/dbInfo';
import router from './router';
import chalk from 'chalk';

const app = new Koa();
app.use(bodyParser());
app.use(router.routes());

app.listen(3002, () => {
  console.log(chalk.green('Server is running!'));
})
