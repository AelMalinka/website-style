/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

const co = require('co');
const cofs = require('co-fs');
const less = require('less');
const plugin = require('less-plugin-autoprefix');

const stat = co.wrap(function* (file) {
	return yield cofs.stat(file);
});

const readFile = co.wrap(function* (file) {
	return yield cofs.readFile(file);
});

module.exports = function(options) {
	var srcDir = options.src || '.';

	return async (ctx, next) => {
		if(!ctx.path.endsWith('.css')) return await next();

		var src = srcDir + ctx.path.replace('.css', '.less');

		if(await cofs.exists(src)) {
			const stats = await stat(src);
			const buff = await readFile(src)

			const code = buff.toString();

			const prefixer = new plugin({ browsers: ['last 2 versions']});
			const tree = await less.render(code, {
				plugins: [prefixer],
				compress: options.compress
			});

			ctx.type = 'css';
			ctx.lastModified = stats.mtime;
			ctx.body = tree.css;
		}
	}
}
