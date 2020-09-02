const extend = require('@alexspirgel/extend');

const normalizeOptions = (options) => {
	const normalizedOptions = extend({}, options);

	if (normalizedOptions.innerElement === undefined || normalizedOptions.innerElement === null) {
		if (normalizedOptions.element.children.length > 0) {
			normalizedOptions.innerElement = normalizedOptions.element.children[0];
		}
		else {
			throw new Error(`'options.element' must have at least one child element to use as 'options.innerElement'.`);
		}
	}

	const defaultUnit = 'px';
	if (typeof normalizedOptions.width === 'number') {
		normalizedOptions.width += defaultUnit;
	}
	if (typeof normalizedOptions.height === 'number') {
		normalizedOptions.height += defaultUnit;
	}

	return normalizedOptions;
};

module.exports = normalizeOptions;