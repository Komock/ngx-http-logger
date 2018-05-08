const dataJson = require('../fixtures/data.js');

const KoaRouter = require('koa-router');
const Router = new KoaRouter({ prefix: '/api' });   

exports.init = App => {

    //==== SUCCESS 200
    //==== GET
    Router.get('/get-200', (ctx, next) => ctx.body = dataJson);
    Router.get('/get-302', (ctx, next) => {
        ctx.status = 302;
        ctx.body = { foo: 'Bar' };
    });
    Router.get('/get-400', (ctx, next) => {
        ctx.status = 400;
        ctx.body = { error: 'Bad request' };
    });
    Router.get('/get-403', (ctx, next) => {
        ctx.status = 403;
        ctx.body = { error: 'Forbidden' };
    });
    Router.get('/get-500', (ctx, next) => {
        ctx.status = 500;
        ctx.body = 'Server error!';
    });

    //==== POST
    Router.post('/post-200', (ctx, next) => ctx.body = ctx.request.body );

    //==== Add MDW
    App.use(Router.routes()).use(Router.allowedMethods());
};