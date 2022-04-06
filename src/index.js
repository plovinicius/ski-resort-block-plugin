/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType('create-block/ski-resort-block', {
	attributes: {
		search: { type: 'string' },
		name: { type: 'string' },
		address: { type: 'string' },
		region: { type: 'string' },
		last_updated: { type: 'string' },
		weather_description: { type: 'string' },
		weather_temperature: { type: 'string' },
		weather_icon_id: { type: 'string' },
		wind_mps: { type: 'number' },
		wind_description: { type: 'string' },
		images_mobile: { type: 'string' },
		images_default: { type: 'string' },
	},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
});
