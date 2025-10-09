// typescript quirks???
// (idk what to do here, aside from this ugly typecasting)
document.forms['words_input' as unknown as number].addEventListener('submit', (ev) =>
{
    ev.preventDefault();

    const form = ev.currentTarget as HTMLFormElement;

    let __submittedString = (form['input_text'] as HTMLInputElement).value;
    if (__submittedString.length === 0) return;

    let e = document.createElement('div');
    e.classList.add('card');
    e.innerText = __submittedString;

    makeElementDraggable(e);

    document.querySelector('main .canvas')!.append(e);

    (form['input_text'] as HTMLInputElement).value = '';
});



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
