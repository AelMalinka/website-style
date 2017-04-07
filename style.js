/*	Copyright 2016 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
	Distributed under the terms of the GNU Affero General Public License v3
*/

var cofs = require('co-fs');
var less = require('less');
var plugin = require('less-plugin-autoprefix');

module.exports = function(options) {
	var srcDir = options.src || '.';

	return function *(next) {
		if(!this.path.endsWith('.css')) return yield next;

		var src = srcDir + this.path.replace('.css', '.less');

		if(yield cofs.exists(src)) {
			var stat = yield cofs.stat(src);
			var code = yield cofs.readFile(src);
			var tree = yield parse(code.toString(), options);
			this.type = 'css';
			this.lastModified = stat.mtime;
			this.body = tree.css;
		}
	}
}

function parse(code, options) {
	return function(callback) {
		var prefixer = new plugin({
			browsers: ['last 2 versions']
		});
		less.render(code, {
			plugins: [prefixer],
			compress: options.compress
		}, callback);
	}
}
