/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

module.exports = {
	name: 'style',
	where: process.env.STYLE_DIR || 'style',
	compress: process.env.STYLE_COMPRESS || (process.env.NODE_ENV === 'production'),
	port: process.env.PORT || 8080,
	config: {
		host: 'localhost' || process.env.CONFIG_HOST,
		port: 8081 || process.env.CONFIG_PORT,
	}
};
