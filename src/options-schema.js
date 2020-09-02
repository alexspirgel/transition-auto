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
		width: [
			{
				type: 'number'
			},
			{
				type: 'string'
			}
		],
		height: [
			{
				type: 'number'
			},
			{
				type: 'string'
			}
		],
		debug: {
			type: 'boolean'
		}
	},
	custom: (inputPathManager) => {
		const requiredSchema = new Schema({required: true});
		if (!requiredSchema.validate(inputPathManager.value.width, 'boolean') &&
		!requiredSchema.validate(inputPathManager.value.height, 'boolean')) {
			throw new Schema.ValidationError(`At least one 'options.width' or 'options.height' value is required.`);
		}
		else {
			return true;
		}
	}
};

const optionsSchema = new Schema(optionsModel);

module.exports = optionsSchema;