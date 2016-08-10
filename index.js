/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
*/

'use strict';

if(process.env.NODE_ENV === 'production') {
	require('@google/cloud-trace').start();
	require('@google/cloud-debug');
}

var koa = require('koa');

var logger = require('koa-logger');
var fresh = require('koa-fresh');
var etag = require('koa-etag');
var compress = require('koa-compress');
var conditional = require('koa-conditional-get');

var style = require('./style.js');
var config = require('config')(require('./config.js'));

var app = koa();

var server;

config.onReady(function() {
	app.use(logger());
	app.use(compress());
	app.use(conditional());
	app.use(fresh());
	app.use(etag());
	app.use(style({src: config.where, compress: config.compress}));

	server = app.listen(config.port);
});

config.onChange(function() {
	server.close(function() {
		server = app.listen(config.port);
	});
});
