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

    useEffect(() => {
        const { search } = attributes;
        if (search) {
            doGetSuggest(search);
        }
    }, []);
 
    async function doGetSuggest(search) {
        await apiFetch({
            path: `/ski-resort-block/v1/resorts/suggest?q=${search}`
        }).then((response) => {
            const res = response.map((item) => {
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
 
    function handleInputChange(newValue) {
        const inputValue = newValue.replace(/\W/g, '');

        if (inputValue) {
            doGetSuggest(inputValue);
        }
 
        return inputValue;
    };
 
    function handleOnChange(item) {
        setAttributes({ search: item.value });
    }
 
    return (
        <div {...useBlockProps()}>
            <div>
                {/* <pre>{attributes.search}</pre> */}

                <Select
                    isSearchable
                    defaultInputValue={attributes.search}
                    defaultValue={attributes.search}
                    onInputChange={handleInputChange}
                    onChange={handleOnChange}
                    options={resorts}
                />
            </div>
        </div>
    );
 }
 