# log(level, message, data)
The log method is the main way you log stuff (duh).
You pass it a loglevel (a string) as well as an optional message and a data object.

A record object will then be assembled, including the time and the numeric loglevel if available:

```json
{
	"time": 1465640683903,
	"level": "trace",
	"message": "Query",
	"levelNumeric": 200,
	"data": {
		"host": "127.0.0.1",
		"db": "database",
		"sql": "SELECT * FROM `table`"
	}
}
```

This object will then be emitted on the underlying EventEmitter under the correct scope.

The `log()` function retruns a Promise (the return value of calling [.emit()](https://paulavery.github.io/events/api/eventemitter/emit.html) on the EventEmitter.