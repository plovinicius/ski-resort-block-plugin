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
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	return (
		<div {...useBlockProps.save()}>
			<div className='srb__container'>
				<div className='srb__header'>
					<h2 className='srb__title'>Fonna Glacier Ski Resort</h2>
				</div>

				<div className='srb__thumbnail'>
					<picture>
						{/* <source srcset="mdn-logo-wide.png" media="(min-width: 600px)" /> */}
						<img src="https://picsum.photos/200/300" alt="MDN" />
					</picture>

					<div className='srb__thumbnail__caption'>
						<h3 className='srb__thumbnail__title'>Dagens Forhold</h3>
						<span className='srb__thumbnail__origin'>
							Oppdatert: 22.06.2019 - 04:29
						</span>
					</div>
				</div>

				<div className='srb__content'>
					<div className='srb__item'>
						<span>Overskyet</span>
					</div>

					<div className='srb__item'>
						<span>10º</span>
					</div>
					
					<div className='srb__item'>
						<span>2.5 m/s</span>
						<span>Sa og si vindstille</span>
					</div>

					<div className='srb__item'>
						<span>Deilig varsno</span>
					</div>
				</div>
			</div>
		</div>
	);
}
