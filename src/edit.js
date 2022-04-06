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
 
import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import Select from 'react-select';
import { useDebounce } from '@wordpress/compose';
 
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
    const [resorts, setResorts] = useState([]);
    const debounceInputChange = useDebounce(handleInputChange, 200);

    useEffect(() => {
        const { search } = attributes;
        if (search) {
            doGetAutocomplete(search);
        }
    }, []);
 
    async function doGetAutocomplete(search) {
        await apiFetch({
            path: `/ski-resort-block/v1/resorts/autocomplete?q=${search}`
        }).then((response) => {
            const { data } = response;
            const res = data.map((item) => {
                return {
                    value: item.name,
                    label: item.name
                }
            });
 
            setResorts(res);
        }).catch((error) => {
            console.error(error);
            setResorts([]);
        });
    }

    async function doGetResortInfo(resort) {
        return await apiFetch({
            path: `/ski-resort-block/v1/resorts/search?q=${resort}`
        }).then(({ data }) => {
            return data;
        }).catch((error) => {
            return null;
        });
    }
 
    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '');

        if (inputValue) {
            doGetAutocomplete(inputValue);
        }
 
        return inputValue;
    };
 
    async function handleOnChange(item) {
        const resortInfo = await doGetResortInfo(item.value);

        setAttributes({ search: item.value });
        saveSelectedData(resortInfo);
    }

    function saveSelectedData(resortInfo) {
        setAttributes({ 
            name: resortInfo?.name,
            address: resortInfo?.address,
            region: resortInfo?.region,
            last_updated: resortInfo?.last_updated,
            weather_description: resortInfo?.weather?.description,
            weather_temperature: resortInfo?.weather?.temperature,
            weather_icon_id: resortInfo?.weather?.icon_id,
            wind_mps: Number(resortInfo?.wind?.mps),
            wind_description: resortInfo?.wind?.description,
            images_mobile: resortInfo?.images?.mobile,
            images_default: resortInfo?.images?.default
        });
    }
 
    return (
        <div {...useBlockProps()}>
            <div>
                <Select
                    isSearchable
                    defaultInputValue={attributes.search}
                    defaultValue={attributes.search}
                    onInputChange={debounceInputChange}
                    onChange={handleOnChange}
                    options={resorts}
                />
            </div>
        </div>
    );
 }
 