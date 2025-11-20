import './styles/styles.scss';

import Alpine from 'alpinejs';
import * as simiSyllable from 'simi-syllable';

import { makeElementDraggable, setElementRandomPosition } from './lib/draggables';
import { closeAllAsideMenus, getFormInput, sliceStringByLetters, toggleFullscreen } from './lib/utils';



/* globals declaration and implementation ************************************/

declare global {
    interface Window {
        clearCanvas: () => void;
    }
}

window.clearCanvas = () =>
{
    document.getElementById('canvas-container')!.innerHTML = '';
}



/* code **********************************************************************/

interface AppDefaultPreferences {
    words: {
        __debug__: any;

        isSplit: boolean;
        language: string;
        splitByNoOfChars: number;
    };
}

const APP_DEFAULT_PREFERENCES = {
    words : {
        __debug__ : 0,

        isSplit : false,
        language : 'none',
        splitByNoOfChars : 3,
    },
} as const;


/* global click event handler */

document.addEventListener('click', (ev) =>
{
    const e = ev.target as HTMLElement;
    if (e === null)
    {
        console.log(ev);
        throw new Error(`Cannot handle click on element.`);
    }

    if (e.closest('main aside') === null)
    {
        closeAllAsideMenus();
    }
});


/* input form */

document.forms['create_menu' as any].addEventListener('submit', (ev) =>
{
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;

    const formTextInput = form['create_menu_input_text'] as HTMLInputElement;

    const optionIsSplit = <HTMLInputElement> document.getElementById('options-menu-option-is-split');
    const optionLanguage = <HTMLInputElement> document.getElementById('options-menu-option-language');
    const optionSplitBy = <HTMLInputElement> document.getElementById('options-menu-option-split-by');

    const canvas = document.getElementById('canvas-container')!;

    let input = getFormInput(formTextInput);

    let wordsToDisplay: string[] = [];


    for (let word of input)
    {
        if (optionIsSplit.checked)
        {
            if (optionLanguage.value === 'en')
            {
                wordsToDisplay.push(...simiSyllable.syllabifyEn(word));
            }
            else if (optionLanguage.value === 'es')
            {
                wordsToDisplay.push(...simiSyllable.syllabifyEs(word));
            }
            else
            {
                wordsToDisplay.push(...sliceStringByLetters(word, +optionSplitBy.value));
            }
        }
        else
        {
            wordsToDisplay.push(word);
        }
    }


    for (let i = 0; i < wordsToDisplay.length; i++)
    {
        let e = document.createElement('div');
        e.classList.add('tile', 'draggable');
        e.innerText = wordsToDisplay[i];

        makeElementDraggable(e, canvas);

        e.addEventListener('dblclick', () =>
        {
            e.classList.toggle('found');
        });

        canvas.append(e);

        setElementRandomPosition(e, canvas);
    }

    formTextInput.value = '';
});


/* aside buttons */

document.querySelector('main aside .create > .aside-button')!.addEventListener('click', () =>
{
    const menu = document.querySelector<HTMLElement>('main aside .aside-menu.create-menu')!;

    if (menu.hidden) closeAllAsideMenus();
    menu.hidden = !menu.hidden;
});
document.querySelector('main aside .options > .aside-button')!.addEventListener('click', () =>
{
    const menu = document.querySelector<HTMLElement>('main aside .aside-menu.options-menu')!;

    if (menu.hidden) closeAllAsideMenus();
    menu.hidden = !menu.hidden;
});


/* Alpine.js */

document.addEventListener('alpine:init', () =>
{
    // locally saved preferences
    let __ls = localStorage.getItem('app-data');

    if (__ls === null)
    {
        let __lsNew: AppDefaultPreferences = structuredClone(APP_DEFAULT_PREFERENCES);

        // in case there is old version availible
        let __loOld = localStorage.getItem('inputOptions');
        if (__loOld !== null)
        {
            let __lsOldParsed = JSON.parse(__loOld);
            // import old data
            __lsNew.words.isSplit = __lsOldParsed.is_split;
            __lsNew.words.language = __lsOldParsed.language;
            __lsNew.words.splitByNoOfChars = __lsOldParsed.split_by_no_of_chars;
        }

        Alpine.store('app_data', __lsNew);
    }
    else
    {
        let __lsParsed: AppDefaultPreferences;

        try
        {
            __lsParsed = JSON.parse(__ls);
            __lsParsed.words.__debug__ = 1;
        }
        catch (err)
        {
            __lsParsed = structuredClone(APP_DEFAULT_PREFERENCES);
        }

        Alpine.store('app_data', __lsParsed);
    }
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('app-data', JSON.stringify( Alpine.store('app_data') ));
});


Alpine.start();
