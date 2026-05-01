<script lang="ts">
    import IconButton from './lib/IconButton.svelte';
    import AsideMenuCreate from './lib/AsideMenuCreate.svelte';
    import AsideMenuOptions from './lib/AsideMenuOptions.svelte';
    import CanvasTile from './lib/CanvasTile.svelte';

    import icon_pencil from './assets/pencil.svg?url';
    import icon_x from './assets/x-lg.svg?url';
    import icon_gear from './assets/gear.svg?url';
    import icon_gh from './assets/github-mark/github-mark.svg?url';


    let canvasTilesCollection = $state<string[]>([]);

    let _whichMenuIsOpen = $state<null | string>(null);
    const toggleMenu = (id: null | string) =>
    {
        if (id === null)
        {
            _whichMenuIsOpen = null;
            return;
        }

        if (_whichMenuIsOpen === id)
        {
            _whichMenuIsOpen = null;
        }
        else
        {
            _whichMenuIsOpen = id;
        }
    };


    function hanldeGlobalClickEvent(ev: Event)
    {
        const e = ev.target as HTMLElement;
        if (e === null)
        {
            console.log(ev);
            throw new Error(`Cannot handle click on element.`);
        }

        if (e.closest('#app aside') === null)
        {
            _whichMenuIsOpen = null;
        }
    }
</script>



<div class="__wrapper__">
    <aside class="aside-panel">
        <div class="aside-section tools">
            <IconButton title="Create" icon={{ src : icon_pencil, size : 0.6, }} onclick={() => toggleMenu('create') } />
            <IconButton title="Clear canvas" icon={{ src : icon_x, size : 0.6, }} onclick={() => canvasTilesCollection = [] } />
            <IconButton title="Options" icon={{ src : icon_gear, size : 0.6, }} onclick={() => toggleMenu('options') } />
        </div>

        <hr />

        <div class="aside-section links">
            <a href="https://github.com/Louikka">
                <IconButton title="Github" icon={{ src : icon_gh, }} />
            </a>
        </div>


        {#if _whichMenuIsOpen === 'create'}
            <div class="aside-menu">
                <AsideMenuCreate bind:canvasTilesCollection />
            </div>
        {/if}

        {#if _whichMenuIsOpen === 'options'}
            <div class="aside-menu">
                <AsideMenuOptions />
            </div>
        {/if}
    </aside>

    <div id="canvas-container">
        {#each canvasTilesCollection as value}
            <CanvasTile {value} />
        {/each}
    </div>
</div>

<svelte:document onclick={hanldeGlobalClickEvent} />



<style>
    .__wrapper__ {
        height : 100% ;

        display : flex ;
    }

    .aside-panel {
        position : relative ;
        z-index : 1 ;

        padding : .8rem ;

        display : flex ;
        flex-direction : column ;

        background-color : var(--color-white) ;
    }

    .aside-section {
        display : flex ;
        flex-direction : column ;
        gap : .2rem ;
    }

    hr {
        width : 100% ;
        margin : 1rem 0 ;

        border-color : var(--color-softblue-light) ;
    }

    .aside-menu {
        position : absolute ;
        left : calc(100% + 1rem) ;
        top : 1rem ;

        padding : .8rem 1rem ;

        background-color : inherit ;
        border-radius : .5rem ;
    }


    #canvas-container {
        position : relative;
        flex-grow : 1 ;

        background-color : var(--color-gainsboro) ;
        background-image : radial-gradient(
            var(--color-softblue-light) 1px,
            var(--color-gainsboro) 1px
        ) ;
        background-size : 20px 20px ;
    }
</style>
