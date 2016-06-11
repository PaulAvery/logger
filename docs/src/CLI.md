# CLI
The library provides a simple cli tool to prettify the json output after the fact. It has no parameters and simply runs anything that comes in on stdin through the prettifier.

Anything that is not parseable is reprinted verbatim.

```sh
your-app | @paulavery/logger
```
