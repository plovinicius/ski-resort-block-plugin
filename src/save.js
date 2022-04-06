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

import { IconBrillantSun } from './icons/BrilliantSun';
import { IconMostlySunny } from './icons/MostlySunny';
import { IconCloudy } from './icons/Cloudy';
import { IconSnowHasBeenReported } from './icons/SnowHasBeenReported';
import { IconItIsSnowing } from './icons/ItIsSnowing';
import { IconDangerOfRain } from './icons/DangerOfRain';
import { IconItIsRaining } from './icons/ItIsRaining';
import { IconDangerOfSleet } from './icons/DangerOfSleet';
import { IconItIsNonsense } from './icons/ItIsNonsense';
import { IconWind } from './icons/Wind';
import { IconRoad } from './icons/Road';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	const iconsEnum = {
		1: <IconBrillantSun />,
		2: <IconMostlySunny />,
		3: <IconCloudy />,
		4: <IconSnowHasBeenReported />,
		5: <IconItIsSnowing />,
		6: <IconDangerOfRain />,
		7: <IconItIsRaining />,
		8: <IconDangerOfSleet />,
		9: <IconItIsNonsense />,
	};

	function Icon({ name }) {
		return <>{ iconsEnum[Number(name)] }</>;
	}

	return (
		<div {...useBlockProps.save()}>
			<div className='srb__container'>
				<div className='srb__header'>
					<h2 className='srb__title'>{attributes.name}</h2>
				</div>

				<div className='srb__thumbnail'>
					<picture>
						<source srcset={attributes.images_default} media="(min-width: 600px)" />
						<img src={attributes.images_mobile} alt={attributes.name} />
					</picture>

					<div className='srb__thumbnail__caption'>
						<h3 className='srb__thumbnail__title'>{attributes.region}</h3>

						<span className='srb__thumbnail__origin'>
							Updated: {attributes.last_updated}
						</span>
					</div>
				</div>

				<div className='srb__content'>
					<div className='srb__item srb__item--weather'>
						<Icon name={attributes.weather_icon_id} />

						<span>{attributes.weather_description}</span>
					</div>

					<div className='srb__item'>
						<span className='srb__item--assertive'>{attributes.weather_temperature}º</span>
					</div>
					
					<div className='srb__item'>
						<div>
							<span className='srb__icon--lighter'>
								<IconWind />
							</span>
							
							<span className='baseline'>
								<strong>{attributes.wind_mps}</strong> m/s
							</span>
						</div>
						<span>{attributes.wind_description}</span>
					</div>

					<div className='srb__item'>
						<span>
							<span className='srb__icon--lighter'>
								<IconRoad />
							</span>

							{attributes.address}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
