/* global module */
module.exports = (context, _methodsToIgnore = []) => {
	const methodsToIgnore = ['constructor', 'render', ..._methodsToIgnore];

	const methods = Object.getOwnPropertyNames(context.constructor.prototype);

	methods.forEach(name => {
		// Skip anything that's not a function
		if (typeof context[name] !== 'function') return;

		// Skip lifecycle methods
		if (name.substring(0, 'component'.length) === 'component') return;

		// Skip any other methods that shouldn't be bound to context
		if (methodsToIgnore.indexOf(name) > -1) return;

		// bind all other methods to class instance
		context[name] = context[name].bind(context);
	});

	return context;
};
