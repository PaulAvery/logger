# Shorthand methods
Any levels passed to the constructor will be exposed as shorthand methods on the Logger and all child loggers.
These are simple wrappers around [.log()](log().md).

**Shorthand:**
```js
/* Log a simple message */
logger.warn('message');

/* Log only some data */
logger.warn({some: 'data'});

/* Log both */
logger.warn('message', {some: 'data'});
```

**Direct invocation:**
```js
/* Log a simple message */
logger.log('warn', 'message');

/* Log only some data */
logger.log('warn', null, {some: 'data'});

/* Log both */
logger.log('warn', 'message', {some: 'data'});
```