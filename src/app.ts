import * as Koa from 'koa';

const app: Koa = new Koa();
// response
app.use((ctx: any) => {
  ctx.body = 'Hello Koa1';
});

app.listen(3000);

