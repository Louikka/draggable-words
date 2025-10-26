import Alpine from 'alpinejs';
import { makeElementDraggable, setElementRandomPosition } from './draggables';



/* globals declaration and implementation ************************************/

declare global {
    interface Window {
        toggleFullscreen: (toggle?: boolean) => void;
        toggleSidePanel: (toggle?: boolean) => void;
        clearCanvas: () => void;
    }
}

window.toggleFullscreen = (toggle?: boolean) =>
{
    if (toggle ?? document.fullscreenElement === null)
    {
        document.documentElement.requestFullscreen().catch((err) =>
        {
            alert(`An error occurred while trying to switch into fullscreen mode : ${err.message} (${err.name}).`);
        });
    }
    else
    {
        document.exitFullscreen();
    }
}

window.toggleSidePanel = (toggle?: boolean) =>
{
    const e = document.querySelector<HTMLElement>('main > aside')!;
    const openButton = document.querySelector<HTMLElement>('main > .side_panel_toggle')!;

    if (toggle ?? e.hidden)
    {
        e.hidden = false;
        openButton.hidden = true;
    }
    else
    {
        e.hidden = true;
        openButton.hidden = false;
    }
}

window.clearCanvas = () =>
{
    document.querySelector('main > .canvas')!.innerHTML = '';
}



/* global ivent listneters ***************************************************/

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
document.forms['words_input' as any].addEventListener('submit', (ev) =>
{
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;

    let __inputValue = (form['input_text'] as HTMLInputElement).value.trim();
    if (__inputValue.length === 0) return;

    let wordsToDisplay: string[] = [];


    // auto split

    let __inputValueArr = __inputValue.split(' ');

    if ((form['option_auto_split'] as HTMLInputElement).checked)
    {
        for (let word of __inputValueArr)
        {
            if (word.length === 0) continue;
            wordsToDisplay.push(...sliceStringByLetters(word, 3));
        }
    }
    else
    {
        wordsToDisplay.push(...__inputValueArr);
    }


    for (let i = 0; i < wordsToDisplay.length; i++)
    {
        let e = document.createElement('div');
        e.classList.add('tile', 'draggable');
        e.innerText = wordsToDisplay[i];

        makeElementDraggable(e);

        e.addEventListener('dblclick', () =>
        {
            e.classList.toggle('found');
        });

        document.querySelector('main .canvas')!.append(e);

        setElementRandomPosition(e, document.querySelector<HTMLElement>('main > .canvas')!);
    }

    (form['input_text'] as HTMLInputElement).value = '';
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('options', JSON.stringify( Alpine.store('localOptions') ));
});

document.addEventListener('alpine:init', () =>
{
    // locally saved preferences
    let __localStorageOptions = localStorage.getItem('options');
    if (__localStorageOptions !== null)
    {
        Alpine.store('localOptions', JSON.parse(__localStorageOptions));
    }
    else
    {
        Alpine.store('localOptions', {});
    }

    // session preferences
    let __sessionStorageOptions = sessionStorage.getItem('options');
    if (__sessionStorageOptions !== null)
    {
        Alpine.store('sessionOptions', JSON.parse(__sessionStorageOptions));
    }
    else
    {
        Alpine.store('sessionOptions', {});
    }
});



/* actual code ***************************************************************/

function sliceStringByLetters(s: string, byNoOfLetters = 1): string[]
{
    if (byNoOfLetters < 1)
    {
        byNoOfLetters = 1;
    }
    else
    {
        byNoOfLetters = Math.floor(byNoOfLetters);
    }

    let __sub = '';
    let res: string[] = [];

    for (let i = 0; i < s.length; i++)
    {
        __sub += s[i];
        if ((i + 1) % byNoOfLetters === 0)
        {
            res.push(__sub);
            __sub = '';
        }
    }

    if (__sub.length !== 0) res.push(__sub);

    return res;
}



Alpine.start();
