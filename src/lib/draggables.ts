export function setElementRandomPosition(element: HTMLElement, boundaryElement = document.documentElement)
{
    element.style.top = Math.floor(Math.random() * boundaryElement.offsetHeight) + 'px';
    element.style.left = Math.floor(Math.random() * boundaryElement.offsetWidth) + 'px';

    if (isElementOutOfBoundaries(element, boundaryElement))
    {
        console.log('Element is out of boundaries.', element);
        setElementRandomPosition(element, boundaryElement);
    }
}

/* @__NO_SIDE_EFFECTS__ */
export function isElementOutOfBoundaries(element: HTMLElement, boundaryElement: HTMLElement): boolean
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

export function makeElementDraggable(element: HTMLElement, boundaryElement = document.documentElement)
{
    let posX1 = 0, posY1 = 0;
    let posX2 = 0, posY2 = 0;


    element.addEventListener('mousedown', (ev: MouseEvent) =>
    {
        ev.preventDefault();

        // get the mouse cursor position at startup
        posX2 = ev.clientX;
        posY2 = ev.clientY;


        document.onmousemove = (ev: MouseEvent) =>
        {
            ev.preventDefault();

            // calculate the new cursor position
            posX1 = posX2 - ev.clientX;
            posY1 = posY2 - ev.clientY;
            posX2 = ev.clientX;
            posY2 = ev.clientY;

            // set the element's new position
            element.style.top = (element.offsetTop - posY1) + 'px';
            element.style.left = (element.offsetLeft - posX1) + 'px';
        };

        document.onmouseup = () =>
        {
            // stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    });
}
