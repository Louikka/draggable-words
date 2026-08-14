<script lang="ts">
    import AsideMenuCreate from './Components/AsideMenuCreate.svelte';
    import AsideMenuOptions from './Components/AsideMenuOptions.svelte';
    import CanvasTile from './Components/CanvasTile.svelte';

    import icon_pencil from 'bootstrap-icons/icons/pencil.svg?raw';
    import icon_x from 'bootstrap-icons/icons/x-lg.svg?raw';
    import icon_gear from 'bootstrap-icons/icons/gear.svg?raw';
    import icon_github from 'bootstrap-icons/icons/github.svg?raw';


    let canvasTilesCollection = $state<string[]>([]);

    let whichMenuIsOpen = $state<string>('');
    const toggleMenu = (id?: string | null) =>
    {
        if (id === undefined || id === null || id === whichMenuIsOpen)
        {
            whichMenuIsOpen = '';
        }
        else
        {
            whichMenuIsOpen = id;
        }
    };


    function hanldeDocumentMouseDown(ev: MouseEvent)
    {
        const e = ev.target as HTMLElement;
        if (e === null)
        {
            console.debug('Cannot handle "onmousedown" event : ', ev);
            return;
        }

        if (e.closest('#app aside') === null)
        {
            toggleMenu(null);
        }
    }
</script>



<svelte:document
    onmousedown={hanldeDocumentMouseDown}
/>

<div class="__wrapper__  h-full flex">
    <aside class="aside-panel  relative z-1 p-3 flex flex-col gap-4 bg-white">
        <div class="aside-section">
            <button class="ui-button" title="Create" onclick={() => toggleMenu('create') }>
                {@html icon_pencil}
            </button>
            {#if whichMenuIsOpen === 'create'}
                <div class="aside-menu ui-w-shadow">
                    <AsideMenuCreate bind:canvasTilesCollection />
                </div>
            {/if}

            <button class="ui-button" title="Clear canvas" onclick={() => canvasTilesCollection = [] }>
                {@html icon_x}
            </button>

            <button class="ui-button" title="Options" onclick={() => toggleMenu('options') }>
                {@html icon_gear}
            </button>
            {#if whichMenuIsOpen === 'options'}
                <div class="aside-menu ui-w-shadow">
                    <AsideMenuOptions />
                </div>
            {/if}
        </div>

        <div class="ui-hr  w-full h-[1.5px]"></div>

        <div class="aside-section">
            <a href="https://github.com/Louikka">
                <button class="ui-button insvgp1" title="Github">
                    {@html icon_github}
                </button>
            </a>
        </div>
    </aside>

    <div id="canvas-container" class="ui-background-pattern  relative grow">
        {#each canvasTilesCollection as value}
            <CanvasTile {value} />
        {/each}
    </div>
</div>



<style>
    .aside-section {
        display : flex ;
        flex-direction : column ;
        gap : .2rem ;
    }

    .aside-menu {
        position : absolute ;
        left : calc(100% + 1rem) ;
        top : 1rem ;

        padding : .8rem 1rem ;

        background-color : var(--color-white) ;
        border-radius : calc(var(--spacing) * 2) ;
    }
</style>
