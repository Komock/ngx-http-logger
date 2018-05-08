exports.init = App => {
	App.use(async(ctx, next) => {
		try {
			await next();
		} catch (err) {
			console.log('Error name: ', err.name);
			console.dir(err);
			if (err.status) {
				ctx.body = { error: err.message };
				ctx.status = err.status;
				return;
			}
			ctx.body = { error: 'Error 500' };
			ctx.status = 500;
			console.error(err.message, err.stack);
		}
	});
}