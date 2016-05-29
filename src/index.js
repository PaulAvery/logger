import merge from 'deepmerge';
import EventEmitter from '@paulavery/events';

import print from './print.js';

export default class Logger extends EventEmitter {
	constructor(options, scope, parent) {
		super(merge({
			debug: false,
			silent: false,
			handler: () => {},
			levels: { trace: 0, info: 100, warn: 200, error: 300 },
			errorThreshold: 100
		}, options || {}), scope, parent);

		/* Create shorthand methods */
		for (let level in this.options.levels) {
			this[level] = data => this.emit(level, data);
		}

		/* Attach a wildcard listener if we are toplevel */
		if(!scope) {
			this.on(this.options.wildcard, (...args) => this.log(...args));
		}
	}

	async log(path, data) {
		/* Create the record which will be output */
		let record = {
			time: Date.now(),
			data: data,
			scope: path.slice(0, -1),
			level: path[path.length - 1]
		};

		if(this.options.levels[record.level] !== undefined) {
			record.levelNumeric = this.options.levels[record.level];
		}

		/* If we are not explicitly set to silent, print it to the output fds */
		if (!this.options.silent || this.options.debug) {
			let stdRecord = JSON.stringify(record);

			if (this.options.debug) {
				stdRecord = print(record);
			}

			if (record.level > this.options.errorThreshold) {
				console.error(stdRecord);
			} else {
				console.log(stdRecord);
			}
		}

		/* Pass it to the handler as well */
		return await this.options.handler(record);
	}
}
