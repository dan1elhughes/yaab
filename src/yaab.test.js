const bindMethods = require('./yaab');

test('Class methods throw when not bound', () => {
	const TestClass = class {
		constructor() {
			this.property = 'value';
		}
		method() {
			return this.property;
		}
	};

	const instance = new TestClass();
	const { method } = instance;

	expect(method).toThrow(TypeError);
});

test('Class methods work when bound', () => {
	const TestClass = class {
		constructor() {
			this.property = 'value';
			bindMethods(this);
		}

		method() {
			return this.property;
		}
	};

	const instance = new TestClass();
	const { method } = instance;

	expect(method()).toBe('value');
});

test('Ignores render and component methods', () => {
	const Reactish = class {
		constructor() {
			this.property = 'value';
			bindMethods(this);
		}

		otherMethod() {
			return this.property;
		}

		render() {
			return this.property;
		}
		componentDidMount() {
			return this.property;
		}
	};

	const instance = new Reactish();
	const { otherMethod, render, componentDidMount } = instance;

	expect(otherMethod()).toBe('value');

	expect(render).toThrow(TypeError);
	expect(componentDidMount).toThrow(TypeError);
});

test("Doesn't bind superclass methods", () => {
	const Superclass = class {
		constructor() {
			this.superclassProperty = 'value';
		}

		superclassMethod() {
			return this.superclassProperty;
		}
	};

	const Subclass = class extends Superclass {
		constructor() {
			super();
			this.subclassProperty = 'value';
			bindMethods(this);
		}

		subclassMethod() {
			return this.subclassProperty;
		}
	};

	const instance = new Subclass();

	const { superclassMethod, subclassMethod } = instance;

	expect(superclassMethod).toThrow(TypeError);
	expect(subclassMethod()).toBe('value');
});

test('Ignores passed methods', () => {
	const TestClass = class {
		constructor() {
			this.property = 'value';
			bindMethods(this, ['ignoredMethod']);
		}

		method() {
			return this.property;
		}
		ignoredMethod() {
			return this.property;
		}
	};

	const instance = new TestClass();
	const { method, ignoredMethod } = instance;

	expect(ignoredMethod).toThrow(TypeError);
	expect(method()).toBe('value');
});
