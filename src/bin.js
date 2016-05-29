#!/usr/bin/env node
import print from './print.js';

process.stdin.setEncoding('utf8');

process.stdin.on('readable', () => {
	let chunk = process.stdin.read();

	if(chunk !== null) {
		let lines = chunk.split('\n');

		lines.forEach(line => {
			if(line !== '') {
				try {
					let parsed = JSON.parse(line);
					let formatted = print(parsed);
					process.stdout.write(formatted + '\n');
				} catch (e) {
					process.stdout.write(line + '\n');
				}
			}
		});
	}
});

process.stdin.on('end', () => {
	process.exit();
});
