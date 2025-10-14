"use strict";
document.forms['words_input'].addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    let __inputValue = form['input_text'].value.trim();
    if (__inputValue.length === 0)
        return;
    let wordsToDisplay;
    if (form['option_auto_split'].checked) {
        wordsToDisplay = [...sliceStringByLetters(__inputValue, 2)];
    }
    else {
        wordsToDisplay = [__inputValue];
    }
    for (let i = 0; i < wordsToDisplay.length; i++) {
        let e = document.createElement('div');
        e.classList.add('card');
        e.innerText = wordsToDisplay[i];
        makeElementDraggable(e);
        document.querySelector('main .canvas').append(e);
        setElementRandomPosition(e, document.querySelector('main > .canvas'));
    }
    form['input_text'].value = '';
});
window.addEventListener('beforeunload', () => {
    localStorage.setItem('options', JSON.stringify(getAppPreferencesState()));
});
(() => {
    let __storageItem = localStorage.getItem('options');
    if (__storageItem !== null) {
        setAppPreferencesState(JSON.parse(__storageItem));
    }
})();
function toggleFullscreen(toggle) {
    if (toggle !== null && toggle !== void 0 ? toggle : document.fullscreenElement === null) {
        document.documentElement.requestFullscreen().catch((err) => {
            alert(`An error occurred while trying to switch into fullscreen mode : ${err.message} (${err.name}).`);
        });
    }
    else {
        document.exitFullscreen();
    }
}
function toggleSidePanel(toggle) {
    const e = document.querySelector('main > aside');
    const openButton = document.querySelector('main > .side_panel_toggle');
    if (toggle !== null && toggle !== void 0 ? toggle : e.hidden) {
        e.hidden = false;
        openButton.hidden = true;
    }
    else {
        e.hidden = true;
        openButton.hidden = false;
    }
}
function clearCanvas() {
    document.querySelector('main > .canvas').innerHTML = '';
}
function sliceStringByLetters(s, byNoOfLetters = 1) {
    if (byNoOfLetters < 1) {
        byNoOfLetters = 1;
    }
    else {
        byNoOfLetters = Math.floor(byNoOfLetters);
    }
    let __sub = '';
    let res = [];
    for (let i = 0; i < s.length; i++) {
        __sub += s[i];
        if ((i + 1) % byNoOfLetters === 0) {
            res.push(__sub);
            __sub = '';
        }
    }
    if (__sub.length !== 0)
        res.push(__sub);
    return res;
}
function setElementRandomPosition(element, boundaryElement = document.documentElement) {
    element.style.top = Math.floor(Math.random() * boundaryElement.offsetHeight) + 'px';
    element.style.left = Math.floor(Math.random() * boundaryElement.offsetWidth) + 'px';
    if (isElementOutOfBoundaries(element, boundaryElement)) {
        console.log('Element is out of boundaries.', element);
        setElementRandomPosition(element, boundaryElement);
    }
}
function isElementOutOfBoundaries(element, boundaryElement = document.documentElement) {
    const childRect = element.getBoundingClientRect();
    const parentRect = boundaryElement.getBoundingClientRect();
    return (childRect.top < parentRect.top ||
        childRect.right > parentRect.right ||
        childRect.bottom > parentRect.bottom ||
        childRect.left < parentRect.left);
}
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
function getAppPreferencesState() {
    return {
        auto_split: document.querySelector('main > aside input[name="option_auto_split"]').checked,
    };
}
function setAppPreferencesState(state) {
    document.querySelector('main > aside input[name="option_auto_split"]').checked = state.auto_split;
}
