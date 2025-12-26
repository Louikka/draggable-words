/**
 * @param element pass `null` in order to request fullscreen for the entire page (`document.documentElement`).
 * @param toggle `true` to enter, `false` to exit, nothing for toggle.
 */
export function toggleFullscreen(element?: Element | null, toggle?: boolean)
{
    if (toggle ?? document.fullscreenElement === null)
    {
        (element ?? document.documentElement).requestFullscreen().catch((err) =>
        {
            console.error(`An error occurred while trying to switch into fullscreen mode : ${err.message} (${err.name}).`);
        });
    }
    else
    {
        document.exitFullscreen();
    }
}

/* @__NO_SIDE_EFFECTS__ */
export function sliceStringByLetters(s: string, byNoOfLetters = 1): string[]
{
    if (byNoOfLetters === 0) return [ s, ];

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

/* @__NO_SIDE_EFFECTS__ */
export function getFormInput(e: HTMLInputElement): string[]
{
    let v = e.value.trim().split(' ');

    return v.filter(s => s !== '');
}

export function closeAllAsideMenus()
{
    document.querySelectorAll<HTMLElement>('main aside .aside-menu').forEach((e) =>
    {
        e.hidden = true;
    });
}
