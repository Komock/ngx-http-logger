const https = require('https');
const Koa = require('koa');
const BodyParser = require('koa-bodyparser');
const App = new Koa();
const Cors = require('koa2-cors');

//=== CORS
App.use(Cors());

//=== Body Parser
App.use(BodyParser({
	onerror: function(err, ctx) {
		ctx.throw(422, 'Error: Wrong data format!');
	}
}));

//=== Logger
require('./middlewares/logger').init(App);

//=== Top level error handler
require('./middlewares/errors').init(App);

//=== Routes
require('./middlewares/routes').init(App);

// Start App
const port = process.env.PORT || 3090;

App.listen(port);
console.log(`App is started on port ${port}!`);