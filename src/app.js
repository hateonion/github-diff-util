import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import r2 from 'r2'

const app = new koa();
const router = new Router();

router.get('/test',async (ctx, next) => {
    await next();
    ctx.body = ctx.state.repos;
});
const user = config.userInfo

const parseRequestData = (ctx, next) => {
    const data = ctx.request.body;
    ctx.state.authData = data;
}

const formatRequestData = async (ctx, next) => {
    const url = `testUrl`;
    console.count(url);
    ctx.state.requestUrl= url;
}

const getRepoDetails = async (ctx, next) => {
    await next();
    const url = ctx.state.requestUrl;
    ctx.state.repos = await r2.get(url).json;
}

app.use(session(app));
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(getRepoDetails);
app.use(formatRequestData);

app.listen(3001);
