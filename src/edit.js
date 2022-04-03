/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

import apiFetch from '@wordpress/api-fetch';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const autoConfigs = [
        {
            name: 'search',
            // The prefix that triggers this completer
            triggerPrefix: '',
            // The option data
            options: [
                { visual: '🍎', name: 'Apple', id: 1 },
                { visual: '🍊', name: 'Orange', id: 2 },
                { visual: '🍇', name: 'Grapes', id: 3 },
            ],
            // Returns a label for an option like "🍊 Orange"
            getOptionLabel: ( option ) => (
                <span>
                    <span className="icon">{ option.visual }</span>
                    { option.name }
                </span>
            ),
            // Declares that options should be matched by their name
            getOptionKeywords: ( option ) => [ option.name ],
            // Declares that the Grapes option is disabled
            // isOptionDisabled: ( option ) => option.name === 'Grapes',
            getOptionCompletion: ( option ) => (
                <span>{ option.name }</span>
            ),
        },
    ];

	return (
		<div {...useBlockProps()}>
			<div>
				<RichText
					autocompleters={ autoConfigs }
					value={attributes.search}
					onChange={ ( newValue ) => {
						setAttributes( { value: newValue } );
					} }
					placeholder={ __(`Type ${autoConfigs[0].triggerPrefix} to choose a ${autoConfigs[0].name}`) }
				/>
			</div>
		</div>
	);
}
