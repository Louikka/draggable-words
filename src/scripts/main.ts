import '../styles/styles.scss'; // ???????

import Alpine from 'alpinejs';
import * as simiSyllable from 'simi-syllable';

import { makeElementDraggable, setElementRandomPosition } from './draggables';
import { sliceStringByLetters, toggleFullscreen } from './utils-abc';



/* globals declaration and implementation ************************************/

declare global {
    interface Window {
        toggleFullscreen: typeof toggleFullscreen;
        clearCanvas: () => void;
    }
}

window.toggleFullscreen = toggleFullscreen;

window.clearCanvas = () =>
{
    document.getElementById('canvas')!.innerHTML = '';
}



/* code **********************************************************************/

const MAIN_INPUT_DEFAULT_OPTIONS = {
    is_split : false,
    language : 'none',
    split_by_no_of_chars : 3,
} as const;

/*
document.addEventListener('click', (ev) =>
{
    const e = ev.target as HTMLElement;
    if (e === null)
    {
        console.log(ev);
        throw new Error(`Cannot handle click on element.`);
    }
});
*/

// typescript quirks???
// (idk what to do here, aside from this ugly typecasting)
document.forms['main_input' as any].addEventListener('submit', (ev) =>
{
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;

    const formElementInput = form['input_text'] as HTMLInputElement;

    const formElementOptionIsSplit = form['option_is_split'] as HTMLInputElement;
    const formElementOptionLanguage = form['option_language'] as HTMLSelectElement;
    const formElementOptionSplitByNoOfChars = form['option_split_by_no_of_chars'] as HTMLInputElement;

    const canvas = document.getElementById('canvas')!;

    let __mainInputValue = formElementInput.value.trim().split(' ');
    if (__mainInputValue.length === 0) return;

    let wordsToDisplay: string[] = [];


    if (formElementOptionIsSplit.checked)
    {
        if (formElementOptionLanguage.value === 'en')
        {
            for (let word of __mainInputValue)
            {
                if (word.length === 0) continue;
                wordsToDisplay.push(...simiSyllable.syllabifyEn(word));
            }
        }
        else if (formElementOptionLanguage.value === 'es')
        {
            for (let word of __mainInputValue)
            {
                if (word.length === 0) continue;
                wordsToDisplay.push(...simiSyllable.syllabifyEs(word));
            }
        }
        else
        {
            for (let word of __mainInputValue)
            {
                if (word.length === 0) continue;
                wordsToDisplay.push(...sliceStringByLetters(word, +formElementOptionSplitByNoOfChars.value));
            }
        }
    }
    else
    {
        for (let word of __mainInputValue)
        {
            if (word.length === 0) continue;
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

    canvas.scrollIntoView();
    formElementInput.value = '';
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('inputOptions', JSON.stringify( Alpine.store('inputOptions') ));
});

document.addEventListener('alpine:init', () =>
{
    // locally saved preferences
    let __localStorageInputOptions = localStorage.getItem('inputOptions');
    if (__localStorageInputOptions !== null)
    {
        Alpine.store('inputOptions', JSON.parse(__localStorageInputOptions));
    }
    else
    {
        Alpine.store('inputOptions', MAIN_INPUT_DEFAULT_OPTIONS);
    }
});


Alpine.start();
