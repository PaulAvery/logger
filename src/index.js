import merge from 'merge';
import EventEmitter from '@paulavery/events';

import print from './print.js';

export default class Logger extends EventEmitter {
	constructor(options, scope, parent) {
		super(merge.recursive(true, {
			debug: false,
			silent: false,
			levels: { trace: 0, info: 100, warn: 200, error: 300 },
			errorThreshold: 100
		}, options || {}), scope, parent);

		/* Create shorthand methods */
		for (let level in this.options.levels) {
			this[level] = (...data) => {
				let message;
				let logData = this.data(data[0]);

				if (typeof data[0] === 'string') {
					message = data[0];
					logData = this.data(data[1]);
				}

				return this.log(level, message, logData);
			};
		}

		/* Attach a wildcard listener if we are toplevel and not silenced */
		if(!scope && (!this.options.silent || this.options.debug)) {
			this.on(this.options.wildcard, (recordScope, record) => {
				let scopedRecord = merge.recursive(true, {scope: recordScope.slice(0, -1)}, record);

				let stdRecord = (this.options.debug ? print : JSON.stringify)(scopedRecord);

				if (record.level > this.options.errorThreshold) {
					console.error(stdRecord);
				} else {
					console.log(stdRecord);
				}
			});
		}
	}

	data(data) {
		if(typeof data !== 'object') {
			return data;
		} else {
			let prevData = this.logData;

			if (this.parent) {
				prevData = this.parent.data(prevData);
			}

			return merge.recursive(true, prevData, data);
		}
	}

	child(scope, data = {}) {
		let child = super.child(scope);
		child.logData = data;

		return child;
	}

	log(level, message, data) {
		/* Create the record which will be output */
		let record = {
			time: Date.now(),
			level: level
		};

		if(message) {
			record.message = message;
		}

		if(data) {
			record.data = data;
		}

		if(this.options.levels[level] !== undefined) {
			record.levelNumeric = this.options.levels[record.level];
		}

		/* Emit it on the evenemitter */
		return this.emit(level, record);
	}
}
