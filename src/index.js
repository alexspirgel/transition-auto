const transitionAuto = (options) => {
	let normalizedOptions;
	try {
		transitionAuto.optionsSchema.validate(options);
		normalizedOptions = transitionAuto.normalizeOptions(options);
	}
	catch (error) {
		transitionAuto.error(error);
	}
	transitionAuto.debug(normalizedOptions, 'normalized options:', normalizedOptions);

	options.element.removeEventListener('transitionend', transitionAuto.transitionendHandlerWidthAuto);
	options.element.removeEventListener('transitionend', transitionAuto.transitionendHandlerHeightAuto);

	transitionAuto.forceCurrentDimensions(normalizedOptions);
	transitionAuto.setDimensions(normalizedOptions);
};

transitionAuto.debug = (options, ...messages) => {
	if (options.debug) {
		const debugPrefix = 'transitionAuto debug:';
		console.log(debugPrefix, ...messages);
	}
};

transitionAuto.error = (message) => {
	const errorPrefix = 'transitionAuto error: ';
	throw new Error(errorPrefix + message);
};

transitionAuto.optionsSchema = require('./options-schema.js');

transitionAuto.normalizeOptions = require('./normalize-options.js');

transitionAuto.forceCurrentDimensions = (options) => {
	computedStyle = getComputedStyle(options.element);
	if (options.width !== undefined && options.width !== null) {
		options.element.style.width = computedStyle.width;
	}
	if (options.height !== undefined && options.height !== null) {
		options.element.style.height = computedStyle.height;
	}
	options.element.offsetWidth; // This line does nothing but force the element to redraw so the transition works properly.
};

transitionAuto.setDimensions = (options) => {
	let elementBoundingClientRect;
	let innerElementBoundingClientRect;
	if (options.width === 'auto' || options.height === 'auto') {
		elementBoundingClientRect = options.element.getBoundingClientRect();
		innerElementBoundingClientRect = options.innerElement.getBoundingClientRect();
	}
	if (options.width !== undefined && options.width !== null) {
		if (options.width === 'auto' && elementBoundingClientRect.width !== innerElementBoundingClientRect.width) {
			options.element.addEventListener('transitionend', transitionAuto.transitionendHandlerWidthAuto);
			options.element.style.width = innerElementBoundingClientRect.width + 'px';
		}
		else {
			options.element.style.width = options.width;
		}
	}
	if (options.height !== undefined && options.height !== null) {
		if (options.height === 'auto' && elementBoundingClientRect.height !== innerElementBoundingClientRect.height) {
			options.element.addEventListener('transitionend', transitionAuto.transitionendHandlerHeightAuto);
			options.element.style.height = innerElementBoundingClientRect.height + 'px';
		}
		else {
			options.element.style.height = options.height;
		}
	}
};

transitionAuto.transitionendHandlerWidthAuto = (event) => {
	if (event.propertyName === 'width') {
		event.target.removeEventListener('transitionend', transitionAuto.transitionendHandlerWidthAuto);
		event.target.style.width = 'auto';
	}
};

transitionAuto.transitionendHandlerHeightAuto = (event) => {
	if (event.propertyName === 'height') {
		event.target.removeEventListener('transitionend', transitionAuto.transitionendHandlerHeightAuto);
		event.target.style.height = 'auto';
	}
};

module.exports = transitionAuto;