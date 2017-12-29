/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');

const etag = require('koa-etag');
const conditional = require('koa-conditional-get');
const send = require('koa-send');
const config = require('./config.js');

const app = new koa();

app.use(logger());
app.use(conditional());
app.use(etag());

app.use(async (ctx, next) => {
	if(ctx.url.startsWith('/' + config.name))
		ctx.url = ctx.url.replace('/' + config.name, '');

	await next();
});

app.use(async (ctx, next) => {
	if(ctx.url == '/default.css') {
		await send(ctx, config.style);
	} else {
		await next();
	}
});

app.use(async (ctx, next) => {
	if(ctx.url.endsWith('.css')) {
		await send(ctx, config.path + ctx.path.replace('.css', '') + '/bootstrap.css');
	} else {
		await next();
	}
});

app.listen(config.port);
