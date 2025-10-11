"use strict";
document.forms['words_input'].addEventListener('submit', (ev) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    let __submittedString = form['input_text'].value;
    if (__submittedString.length === 0)
        return;
    let wordsToDisplay;
    if (form['option_auto_split'].checked) {
        wordsToDisplay = sliceStringByLetters(__submittedString, 2);
    }
    else {
        wordsToDisplay = [__submittedString];
    }
    const __canvasWidth = document.querySelector('main > .canvas').clientWidth;
    const __canvasHeight = document.querySelector('main > .canvas').clientHeight;
    for (let i = 0; i < wordsToDisplay.length; i++) {
        let e = document.createElement('div');
        e.classList.add('card');
        e.innerText = wordsToDisplay[i];
        e.style.top = `${__canvasHeight / 2 + i * 5}px`;
        e.style.left = `${__canvasWidth / 2 + i * 10}px`;
        makeElementDraggable(e);
        document.querySelector('main .canvas').append(e);
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
    const e = document.querySelector('main > aside > .inputs');
    if (toggle !== null && toggle !== void 0 ? toggle : e.classList.contains('hide')) {
        e.classList.remove('hide');
    }
    else {
        e.classList.add('hide');
    }
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
        auto_split: document.querySelector('main > aside > .inputs input[name="option_auto_split"]').checked,
    };
}
function setAppPreferencesState(state) {
    document.querySelector('main > aside > .inputs input[name="option_auto_split"]').checked = state.auto_split;
}
