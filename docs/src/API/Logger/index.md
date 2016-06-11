# Logger
The module exports the `Logger` class (extends [@paulavery/events](https://paulavery.github.io/events/api/eventemitter/). It is instantiated with an optional options object with the following default values:

```js
import Logger from '@paulavery/logger';

let logger = new Logger({
	debug: false,
	silent: false,
	levels: { trace: 0, info: 100, warn: 200, error: 300 },
	errorThreshold: 100
});
```

## Options
### debug
If true, all logged entries will be prettyprinted to stdout or stderr respectively.

### silent
If true and `debug` is set to false, nothing will be output to stderr/stdout.

### handler
A function which will be called with each logentry.

### levels
An object which provides a mapping from names to numerical loglevels. These are used to create shorthand methods as well as to determine wether to log a given statement to stderr or stdout.

### errorThreshold
The loglevel from which on a logentry should be output to stderr instead of stdout. The given loglevel will still be logged to stdout.

## Listeners
As the Logger class is also an EventEmitter, all events are emitted on the toplevel logger.
That means you may simply do the following:

```js
let logger = new Logger();

logger.on('*', (scope, record) => logSomehow(scope, record));
```

This works with all childloggers as well.