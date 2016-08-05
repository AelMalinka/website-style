/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
*/

module.exports = {
	where: process.env.STYLE_DIR || 'style',
	compress: process.env.STYLE_COMPRESS || (process.env.NODE_ENV === 'production'),
	port: process.env.PORT || (process.env.NODE_ENV === 'production' ? 8080 : 8083),
};
