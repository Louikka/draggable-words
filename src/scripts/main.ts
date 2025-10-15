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

    let __inputValueArr = __inputValue.split(' ');
    let wordsToDisplay: string[] = [];

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
        e.classList.add('card');
        e.innerText = wordsToDisplay[i];

        makeElementDraggable(e);

        document.querySelector('main .canvas')!.append(e);

        setElementRandomPosition(e, document.querySelector<HTMLElement>('main > .canvas')!);
    }

    (form['input_text'] as HTMLInputElement).value = '';
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('options', JSON.stringify( Alpine.store('appOptions') ));
});

document.addEventListener('alpine:init', () =>
{
    let __storageItem = localStorage.getItem('options');
    if (__storageItem !== null)
    {
        Alpine.store('appOptions', JSON.parse(__storageItem));
    }
});



function toggleFullscreen(toggle?: boolean)
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

function toggleSidePanel(toggle?: boolean)
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

function clearCanvas()
{
    document.querySelector('main > .canvas')!.innerHTML = '';
}

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

function setElementRandomPosition(element: HTMLElement, boundaryElement = document.documentElement)
{
    element.style.top = Math.floor(Math.random() * boundaryElement.offsetHeight) + 'px';
    element.style.left = Math.floor(Math.random() * boundaryElement.offsetWidth) + 'px';

    if (isElementOutOfBoundaries(element, boundaryElement))
    {
        console.log('Element is out of boundaries.', element);
        setElementRandomPosition(element, boundaryElement);
    }
}
function isElementOutOfBoundaries(element: HTMLElement, boundaryElement = document.documentElement): boolean
{
    const childRect = element.getBoundingClientRect();
    const parentRect = boundaryElement.getBoundingClientRect();

    return (
        childRect.top < parentRect.top ||
        childRect.right > parentRect.right ||
        childRect.bottom > parentRect.bottom ||
        childRect.left < parentRect.left
    );
}

function makeElementDraggable(element: HTMLElement)
{
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    element.addEventListener('mousedown', dragMouseDown);


    function dragMouseDown(ev: MouseEvent)
    {
        ev.preventDefault();

        // get the mouse cursor position at startup
        pos3 = ev.clientX;
        pos4 = ev.clientY;

        document.onmouseup = closeDragElement;

        // call a function whenever the cursor moves
        document.onmousemove = elementDrag;
    }

    function elementDrag(ev: MouseEvent)
    {
        ev.preventDefault();

        // calculate the new cursor position
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;

        // set the element's new position
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }

    function closeDragElement(ev: MouseEvent)
    {
        // stop moving when mouse button is released
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
