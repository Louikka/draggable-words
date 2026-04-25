import Alpine from 'alpinejs';
import * as simiSyllable from 'simi-syllable';

import { makeElementDraggable, setElementRandomPosition } from './lib/draggables';
import { closeAllAsideMenus, getFormInput, sliceStringByLetters } from './lib/utils';



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

    const optionIsSplit = document.getElementById('options-menu-option-is-split') as HTMLInputElement;
    const optionLanguage = document.getElementById('options-menu-option-language') as HTMLInputElement;
    const optionSplitBy = document.getElementById('options-menu-option-split-by') as HTMLInputElement;

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
        e.textContent = wordsToDisplay[i];

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
    const ls = localStorage.getItem('app-data');

    // in case there is old version availible
    const lsOld = localStorage.getItem('inputOptions');

    if (ls === null)
    {
        let lsNew: AppDefaultPreferences = structuredClone(APP_DEFAULT_PREFERENCES);

        if (lsOld !== null)
        {
            let __lsOldParsed = JSON.parse(lsOld);
            // import old data
            lsNew.words.isSplit = __lsOldParsed.is_split;
            lsNew.words.language = __lsOldParsed.language;
            lsNew.words.splitByNoOfChars = __lsOldParsed.split_by_no_of_chars;
        }

        Alpine.store('app_data', lsNew);
    }
    else
    {
        let lsParsed: AppDefaultPreferences;

        try
        {
            lsParsed = JSON.parse(ls);
            lsParsed.words.__debug__ = 1;
        }
        catch (err)
        {
            lsParsed = structuredClone(APP_DEFAULT_PREFERENCES);
        }

        Alpine.store('app_data', lsParsed);
    }
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('app-data', JSON.stringify( Alpine.store('app_data') ));
});


Alpine.start();
