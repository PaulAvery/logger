import chalk from 'chalk';

export default function prettyPrint(record) {
	let padding = new Array(Math.max(5 - record.level.length, 0) + 1).join(' ');

	let time = (new Date(record.time)).toLocaleString();
	let path = record.scope.length > 0 ? record.scope.join(chalk.dim(' > ')) + (record.message ? ' > ' : '') : '';
	let level = record.level + padding;
	let levelColor = { trace: 'white', info: 'green', warn: 'yellow', error: 'red' }[record.level] || 'gray';
	let message = record.message || '';
	let data = record.data ? `[ ${chalk.dim(JSON.stringify(record.data))} ]` : '';

	return `[ ${chalk.blue(time)} ][ ${chalk[levelColor](level)} ]${data} ${chalk.gray(path)}${chalk.white(message)}`;
}
