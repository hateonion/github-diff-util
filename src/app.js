import koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import config from '../user.config.json';
import r2 from 'r2'

const app = new koa();
const router = new Router();

const parseRequestData = (ctx, next) => {
    const data = ctx.request.body;
    ctx.state.authData = data;
}

router.get('/test',async (ctx, next) => {
    await next();
    ctx.body = ctx.state.repos;
});

const formatRequestData = async (ctx, next) => {
    const requestUrl = `https://${config.user}:${config.token}@api.github.com/orgs/${config.org}`
    ctx.state.requestUrl= requestUrl;
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
