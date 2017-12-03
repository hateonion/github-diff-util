import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import mongoose from 'mongoose';

const app = new koa();
const router = new Router();

router.post('/create', async (ctx, next) => {
  const data = ctx.request.body;
  mongoose.connect('mongodb://localhost:33333/testdb');
  const db = mongoose.connection;
  db.on('error', console.warn('connection error'));
  db.once('open', () => {
    const testSchema = mongoose.Schema({
      name: string
    });
    const test = mongoose.model('test', testSchema);
    const testInstance = new test({name: data.name});
    testInstance.save((err, testInstance) => {
      if(err) {
        console.error('warning!');
      }
    });
  });
});

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.listen(3001);
