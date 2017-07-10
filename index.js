/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

'use strict';

const koa = require('koa');
const logger = require('koa-logger');

const etag = require('koa-etag');
const compress = require('koa-compress');
const conditional = require('koa-conditional-get');

const style = require('./style.js');
const serve = require('koa-static');
const route = require('koa-route');

const config = require('config')(require('./config.js'));

const app = new koa();

app.use(logger());
app.use(compress());
app.use(conditional());
app.use(etag());

// 2017-04-27 AMR NOTE: router prepend and static path need to match on /fonts/
app.use(route.get(/^\/fonts(?:\/|$)/, serve('external/bootstrap')));

config.onReady(function() {
	app.use(style({src: config.where, compress: config.compress}));

	app.listen(config.port);
});
