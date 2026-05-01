export const APP_OPTIONS = $state<AppOptions>({
    lang : 'en',
    tilesFontSize : 8,

    split : {
        isSplit : false,
        language : 'none',
        byNoOfChars : 3,
    },
});


const ls = localStorage.getItem('options');
if (ls !== null)
{
    // in case there is old version availible
    const ls_old = localStorage.getItem('app-data');
    if (ls_old !== null)
    {
        try
        {
            const _ls_old_parsed = JSON.parse(ls_old);

            // import old data
            APP_OPTIONS.split.isSplit = _ls_old_parsed.words.isSplit;
            APP_OPTIONS.split.language = _ls_old_parsed.words.language;
            APP_OPTIONS.split.byNoOfChars = _ls_old_parsed.words.splitByNoOfChars;
        }
        catch (err)
        {
            console.error('Unable to retrieve old application options.');
            console.debug(ls_old);
        }
    }

    try
    {
        const _ls_parsed = JSON.parse(ls) as AppOptions;

        for (const [key, value] of Object.entries(_ls_parsed))
        {
            APP_OPTIONS[key as keyof AppOptions] = value;
        }
    }
    catch (err)
    {
        console.error('Unable to retrieve application options.');
        console.debug(ls);
    }
}
