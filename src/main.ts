import { mount } from 'svelte';
import App from './App.svelte';

import { APP_OPTIONS } from './shared.svelte';


window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('options', JSON.stringify(APP_OPTIONS));
});


export default mount(App, {
    target : document.getElementById('app')!,
});
