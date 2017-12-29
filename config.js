/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

module.exports = {
	name: 'style',
	compress: process.env.STYLE_COMPRESS || (process.env.NODE_ENV === 'production'),
	port: process.env.PORT || 8081,
	path: 'node_modules/bootswatch/dist',
	style: 'node_modules/bootswatch/dist/cyborg/bootstrap.css',
};
