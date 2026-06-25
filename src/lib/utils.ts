export function getRandomInRange(min: number, max: number): number
{
    return Math.random() * (max - min) + min;
}

export function sliceStringByLetters(s: string, byNoOfLetters = 1): string[]
{
    if (byNoOfLetters === 0) return [ s ];

    if (byNoOfLetters < 1)
    {
        byNoOfLetters = 1;
    }
    else
    {
        byNoOfLetters = Math.trunc(byNoOfLetters);
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

export function getFormInput(e: HTMLInputElement, splitChar = ' '): string[]
{
    let v = e.value.trim().split(splitChar);
    return v.filter(s => s !== '');
}



export function generateRandomPosition(element: HTMLElement, boundaryElement?: HTMLElement): Position
{
    if (boundaryElement === undefined && element.offsetParent === null)
    {
        console.error(`Cannot generate position because element does not have a boundary element or a parent.`, element);
    }

    const _elementDOMRect = element.getBoundingClientRect();
    const _parentDOMRect = (boundaryElement ?? element.offsetParent!).getBoundingClientRect();

    const safeRect = {
        top:    _parentDOMRect.top,
        right:  _parentDOMRect.right - _elementDOMRect.width,
        bottom: _parentDOMRect.bottom - _elementDOMRect.height,
        left:   _parentDOMRect.left,
    };

    return {
        x: Math.floor(getRandomInRange(safeRect.left, safeRect.right)),
        y: Math.floor(getRandomInRange(safeRect.top, safeRect.bottom)),
    };
}

/**
 * @param boundaryElement if absent, element's parent used instead (see [`offsetParent`](https://developer.mozilla.org/docs/Web/API/HTMLElement/offsetParent) property of `HTMLElement`).
 */
export function makeElementDraggable(element: HTMLElement, boundaryElement?: HTMLElement)
{
    if (boundaryElement === undefined && element.offsetParent === null)
    {
        console.error(`Draggable element does not have a boundary element or a parent.`, element);
    }

    const _parentDOMRect = (boundaryElement ?? element.offsetParent!).getBoundingClientRect();

    let mousePosition = { x: 0, y: 0 };


    element.addEventListener('mousedown', (ev: MouseEvent) =>
    {
        ev.preventDefault();

        // get the mouse cursor position at startup
        mousePosition.x = ev.clientX;
        mousePosition.y = ev.clientY;


        document.onmousemove = (ev: MouseEvent) =>
        {
            ev.preventDefault();

            const _elementDOMRect = element.getBoundingClientRect();
            //console.log(_elementDOMRect, _parentDOMRect)

            // calculate difference between old and new position
            let diffX = ev.clientX - mousePosition.x;
            let diffY = ev.clientY - mousePosition.y;

            // calculate the new cursor position
            let posX = element.offsetLeft + diffX;
            let posY = element.offsetTop + diffY;

            // restrict movement past the boundaries of the parent element
            if (posX < 0) posX = 0;
            if (posY < 0) posY = 0;
            if (_elementDOMRect.right > _parentDOMRect.right) posX = element.offsetLeft - 1; // todo : fix
            if (_elementDOMRect.bottom > _parentDOMRect.bottom) posY = element.offsetTop - 1; // todo : fix

            // set the element's new position
            element.style.top = posY + 'px';
            element.style.left = posX + 'px';

            // save new mouse position (??? idk why, but it works)
            mousePosition.x = ev.clientX;
            mousePosition.y = ev.clientY;
        };

        document.onmouseup = () =>
        {
            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    });
}
