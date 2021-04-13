const Schema = require('@alexspirgel/schema');

const optionsModel = {
	required: true,
	type: 'object',
	propertySchema: {
		element: {
			required: true,
			type: 'object',
			instanceOf: Element
		},
		innerElement: {
			type: 'object',
			instanceOf: Element,
			custom: (inputPathManager) => {
				const innerElement = inputPathManager.value;
				inputPathManager.removePathSegment();
				const element = inputPathManager.value.element;
				if (element.contains(innerElement) && element !== innerElement) {
					return true;
				}
				else {
					throw new Schema.ValidationError(`'options.innerElement' must be contained within 'options.element'.`);
				}
			}
		},
		property: {
			required: true,
			type: 'string',
			exactValue: [
				'height',
				'width'
			]
		},
		value: [
			{
				required: true,
				type: 'number',
				greaterThanOrEqualTo: 0
			},
			{
				required: true,
				type: 'string',
				custom: (inputPathManager) => {
					const value = inputPathManager.value;
					if (value.endsWith('px')) {
						return true;
					}
					else {
						throw new Schema.ValidationError(`'options.value' string must end with 'px'.`);
					}
				}
			},
			{
				required: true,
				type: 'string',
				exactValue: 'auto'
			}
		],
		onComplete: {
			type: 'function'
		},
		suppressDuplicates: {
			type: 'boolean'
		},
		debug: {
			type: 'boolean'
		}
	}
};

const optionsSchema = new Schema(optionsModel);

module.exports = optionsSchema;