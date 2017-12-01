import koa from 'koa';
import Router from 'koa-router';
import r2 from 'r2'

const app = new koa();
const router = new Router();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next()
  const end = Date.now();
  const ms = end - start;
  ctx.set('X-Response-Time', `${ms}-ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();
  await next()
  const end = Date.now();
  const ms = end - start;
  console.log(`${ms}-ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.use(async (ctx) => ctx.body = 'hello world');

app.listen(3000);