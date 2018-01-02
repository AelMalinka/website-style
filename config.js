/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

module.exports = {
	name: 'style',
	compress: process.env.STYLE_COMPRESS || (process.env.NODE_ENV === 'production'),
	port: process.env.PORT || 8081,
	path: process.env.STYLE_PATH || 'node_modules/bootswatch/dist',
	js: process.env.JS_PATH || 'node_modules/bootstrap/dist/js',
	style: process.env.STYLE_DEFAULT || 'node_modules/bootswatch/dist/cyborg/bootstrap.css',
};
