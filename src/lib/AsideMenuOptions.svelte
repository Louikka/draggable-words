<script lang="ts">
    import { APP_OPTIONS } from '../shared.svelte';
</script>



<div class="__wrapper__">
    <fieldset>
        <legend>Language options</legend>

        <label>
            Use language for splitting
            <select bind:value={APP_OPTIONS.split.language}>
                <option value="none">None</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
        </label>
    </fieldset>

    <fieldset>
        <legend>Split options</legend>

        <label>
            Split words
            <input type="checkbox" bind:checked={APP_OPTIONS.split.isSplit} />
        </label>

        {#if APP_OPTIONS.split.isSplit && APP_OPTIONS.split.language === 'none'}
            <label>
                Split by
                <input type="number" min="1" style="width:3em" bind:value={APP_OPTIONS.split.byNoOfChars} />
                character(s)
            </label>
        {/if}
    </fieldset>

    <fieldset>
        <legend>Other</legend>

        <label>
            Tiles font size
            <input type="number" min="2" max="32" style="width:3em" bind:value={APP_OPTIONS.tilesFontSize} />
        </label>
    </fieldset>
</div>



<style>
    .__wrapper__ {
        min-width : 400px ;

        display : flex ;
        flex-direction : column ;
        gap : 1rem ;
    }

    fieldset {
        margin : 0 ;

        display : flex ;
        flex-direction : column ;
        gap : .5rem ;

        border : 2px solid var(--color-softblue-light) ;
        border-radius : calc(var(--spacing) * 2) ;
    }
    fieldset > legend {
        padding : 0 calc(var(--spacing) * 1) ;
    }

    select {
        border-bottom : 2px solid var(--color-softblue-light) ;
    }

    input[type="number"] {
        border-bottom : 2px solid var(--color-softblue-light) ;
    }
</style>
