# Yaab (Yet another auto binder)

Forces class methods to be bound to instances. There are plenty of libraries to do this already, but this one is my one. Also I wrote tests.

Preconfigured for React, i.e. ignores `render()` and `component...()` methods.

## Installation

Via npm:

```bash
$ npm install --save yaab
```

## Usage

```js
import bindMethods from 'yaab';

class TestClass {
	constructor() {
		this.property = 'value';
		bindMethods(this);
	}

	method() { return this.property; }
};

const instance = new TestClass();
const { method } = instance;

console.log(method()); // => 'value'
```

## API

### bindMethods(obj, [ignoredMethods])

Binds all methods on the object to itself.

#### obj

Object with methods to be bound. Typically a "this" at the end of a constructor.

#### ignoredMethods

Array of method names to ignore.
