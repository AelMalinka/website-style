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
var config = require('./config.js');

var app = koa();

app.use(logger());
app.use(compress());
app.use(conditional());
app.use(fresh());
app.use(etag());
app.use(style({src: config.where, compress: config.compress}));

app.listen(config.port);
