export const APP_OPTIONS = $state<AppOptions>({
    lang: 'en',
    tilesFontSize: 8,

    split: {
        isSplit: false,
        language: 'none',
        byNoOfChars: 3,
    },
});

window.addEventListener('beforeunload', () =>
{
    localStorage.setItem('options', JSON.stringify(APP_OPTIONS));
});


const ls = localStorage.getItem('options');
if (ls !== null)
{
    try
    {
        const _ls_parsed = JSON.parse(ls) as AppOptions;

        for (const [key, value] of Object.entries(_ls_parsed))
        {
            //@ts-ignore
            APP_OPTIONS[key] = value;
        }
    }
    catch (err)
    {
        console.error('Unable to retrieve application options.');
        console.debug(ls);
    }
}
