const optionsSchema = require('./options-schema.js');
const extend = require('@alexspirgel/extend');

const transitionAuto = (function () {

	function prefixedError(message) {
		throw new Error('transitionAuto error: ' + message);
	}

	function debug(options, ...messages) {
		if (options.debug) {
			console.log('debugPrefix', ...messages);
		}
	}

	function normalizeOptions(options) {
		options = extend({}, options);

		if (options.innerElement === undefined || options.innerElement === null) {
			if (options.element.children.length > 0) {
				options.innerElement = options.element.children[0];
			}
			else {
				prefixedError(`'options.element' must have at least one child element to use as 'options.innerElement'.`);
			}
		}

		if (typeof options.value === 'number') {
			options.value += 'px';
		}

		if (options.suppressDuplicates === undefined) {
			options.suppressDuplicates = true;
		}

		if (options.debug === undefined) {
			options.debug = false;
		}

		return options;
	}

	function setValue(options) {
		options.element.transitionAutoValue = options.value;
		const computedStyle = getComputedStyle(options.element);
		options.element.style[options.property] = computedStyle[options.property];
		options.element.offsetHeight; // This line does nothing but force the element to repaint so transitions work properly.
		
		let hasTransition = false;
		const transitionPropertyValues = computedStyle.transitionProperty.split(', ');
		const transitionDurationValues = computedStyle.transitionDuration.split(', ');
		for (let i = 0; i < transitionPropertyValues.length; i++) {
			if (transitionPropertyValues[i] === 'all' || transitionPropertyValues[i] === options.property) {
				const transitionDuration = transitionDurationValues[i] ? transitionDurationValues[i] : transitionDurationValues[0];
				if (transitionDuration !== '0s') {
					hasTransition = true;
					break;
				}
			}
		}

		if (hasTransition) {
			debug(options, 'transition detected.');
			if (options.value === 'auto') {
				const elementDimensions = options.element.getBoundingClientRect();
				const innerElementDimensions = options.innerElement.getBoundingClientRect();
				if (elementDimensions[options.property] !== innerElementDimensions[options.property]) {
					options.element.transitionAutoBoundHandler = transitionendHandler.bind(options);
					options.element.addEventListener('transitionend', options.element.transitionAutoBoundHandler);
					options.element.style[options.property] = innerElementDimensions[options.property] + 'px';
					return;
				}
			}
			else {
				if (options.element.style[options.property] !== options.value) {
					options.element.transitionAutoBoundHandler = transitionendHandler.bind(options);
					options.element.addEventListener('transitionend', options.element.transitionAutoBoundHandler);
					options.element.style[options.property] = options.value;
					return;
				}
			}
		}

		debug(options, 'immediate fallback.');
		options.element.style[options.property] = options.value;
		onComplete(options);
	}
	
	function transitionendHandler(event) {
		if (event.propertyName === this.property) {
			if (this.element.transitionAutoBoundHandler) {
				this.element.removeEventListener('transitionend', this.element.transitionAutoBoundHandler);
				delete this.element.transitionAutoBoundHandler;
			}
			if (this.value === 'auto') {
				this.element.style[this.property] = this.value;
			}
		}
		onComplete(this);
	}

	function onComplete(options) {
		if (options.element.transitionAutoValue) {
			delete options.element.transitionAutoValue;
		}
		if (options.onComplete) {
			options.onComplete(options);
		}
	}

	return function (options) {
		try {
			optionsSchema.validate(options);
		}
		catch (error) {
			prefixedError(error);
		}
		options = normalizeOptions(options);
		debug(options, 'options:', options);
		if (options.suppressDuplicates && options.element.transitionAutoValue) {
			if (options.value === options.element.transitionAutoValue) {
				debug(options, 'duplicate suppressed.');
				return;
			}
		}
		if (options.element.transitionAutoBoundHandler) {
			options.element.removeEventListener('transitionend', options.element.transitionAutoBoundHandler);
			delete options.element.transitionAutoBoundHandler;
		}
		setValue(options);
	};

})();

module.exports = transitionAuto;