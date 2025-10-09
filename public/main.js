"use strict";
document.forms['words_input'].addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    let __submittedString = form['input_text'].value;
    if (__submittedString.length === 0)
        return;
    let e = document.createElement('div');
    e.classList.add('card');
    e.innerText = __submittedString;
    makeElementDraggable(e);
    document.querySelector('main .canvas').append(e);
    form['input_text'].value = '';
});
function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.addEventListener('mousedown', dragMouseDown);
    function dragMouseDown(ev) {
        ev.preventDefault();
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(ev) {
        ev.preventDefault();
        pos1 = pos3 - ev.clientX;
        pos2 = pos4 - ev.clientY;
        pos3 = ev.clientX;
        pos4 = ev.clientY;
        element.style.top = (element.offsetTop - pos2) + 'px';
        element.style.left = (element.offsetLeft - pos1) + 'px';
    }
    function closeDragElement(ev) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
