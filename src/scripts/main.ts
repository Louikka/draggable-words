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
document.forms['words_input' as unknown as number].addEventListener('submit', (ev) =>
{
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;

    let __submittedString = (form['input_text'] as HTMLInputElement).value;
    if (__submittedString.length === 0) return;

    let wordsToDisplay: string[];

    if ((form['option_auto_split'] as HTMLInputElement).checked)
    {
        wordsToDisplay = sliceStringByLetters(__submittedString, 2);
    }
    else
    {
        wordsToDisplay = [ __submittedString ];
    }

    const __canvasWidth = document.querySelector('main > .canvas')!.clientWidth;
    const __canvasHeight = document.querySelector('main > .canvas')!.clientHeight;

    for (let i = 0; i < wordsToDisplay.length; i++)
    {
        let e = document.createElement('div');
        e.classList.add('card');
        e.innerText = wordsToDisplay[i];

        e.style.top = `${ __canvasHeight / 2 + i * 5 }px`;
        e.style.left = `${ __canvasWidth / 2 + i * 10 }px`;

        makeElementDraggable(e);

        document.querySelector('main .canvas')!.append(e);
    }

    (form['input_text'] as HTMLInputElement).value = '';
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('options',
        JSON.stringify(getAppPreferencesState())
    );
});

(() =>
{
    let __storageItem = localStorage.getItem('options');
    if (__storageItem !== null)
    {
        setAppPreferencesState(JSON.parse(__storageItem));
    }
})();





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
    const e = document.querySelector('main > aside > .inputs')!;

    if (toggle ?? e.classList.contains('hide'))
    {
        e.classList.remove('hide');
    }
    else
    {
        e.classList.add('hide');
    }
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

function getAppPreferencesState(): AppOptions
{
    return {
        auto_split : document.querySelector<HTMLInputElement>('main > aside > .inputs input[name="option_auto_split"]')!.checked,
    };
}
function setAppPreferencesState(state: AppOptions)
{
    document.querySelector<HTMLInputElement>('main > aside > .inputs input[name="option_auto_split"]')!.checked = state.auto_split;
}
