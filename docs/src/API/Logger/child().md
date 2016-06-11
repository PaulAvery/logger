# child(scope, data)
You may create childloggers by invoking `child(scope)`. `scope` should be a string.
The method returns a childlogger which has all the methods of the parent and works as you would expect:

```js
let logger = new Logger();
let child = logger.child('scope');

/* {"time":1465640683903,"scope":[],"level":"warn","message":"Main Warning!","levelNumeric":200} */
logger.warn('Main Warning');

/* {"time":1465640683903,"scope":["scope"],"level":"warn","message":"Sub Warning!","levelNumeric":200} */
child.warn('Sub Warning');
```

## Data
If you pass anything as a second object, that value will be set as the childloggers default data.
If you then log something with some additional data, the two objects will be merged:

```js
let logger = new Logger();
let ormLogger = logger.child('orm', {host: '127.0.0.1', db: 'database');

/* {
	"time": 1465640683903,
	"scope": [ "orm" ],
	"level": "trace",
	"message": "Query",
	"levelNumeric": 200,
	"data": {
		"host": "127.0.0.1",
		"db": "database",
		"sql": "SELECT * FROM `table`"
	}	
} */
ormLogger.trace('Query', { sql: 'SELECT * FROM `table`;' });
```

The log calls data takes precedence over that of the logger.