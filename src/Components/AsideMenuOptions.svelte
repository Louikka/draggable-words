<script lang="ts">
    import { APP_OPTIONS } from '../lib/shared.svelte';

    import icon_exclamation_circle from 'bootstrap-icons/icons/exclamation-circle.svg?raw';
</script>



<div class="min-w-100 flex flex-col gap-4">
    <fieldset>
        <legend>Language options</legend>

        <label>
            Language
            <select bind:value={APP_OPTIONS.split.language}>
                <option value="none">None</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
            </select>
        </label>
    </fieldset>

    <fieldset>
        <legend>Split options</legend>

        {const isSplitWarning = $derived(APP_OPTIONS.split.isSplit && APP_OPTIONS.split.language !== 'none')}

        <label
            role={isSplitWarning ? 'status' : null}
        >
            Split
            <input
                type="checkbox"
                bind:checked={APP_OPTIONS.split.isSplit}
            />
            {#if isSplitWarning}
                <span class="text-amber-700">
                    <strong class="inline-block align-middle ml-1 pb-0.5" aria-hidden="true">
                        {@html icon_exclamation_circle}
                    </strong>
                    <i class="text-[.67em]">
                        Splitting will not work unless language is set to "none".
                    </i>
                </span>
            {/if}
        </label>

        {#if APP_OPTIONS.split.isSplit}
            <label>
                Split by
                <input
                    class="ui-input-number"
                    type="number"
                    min="1"
                    bind:value={APP_OPTIONS.split.byNoOfChars}
                />
                character(s)
            </label>
        {/if}
    </fieldset>

    <fieldset>
        <legend>Other</legend>

        <label>
            Tiles font size
            <input
                class="ui-input-number"
                type="number"
                min="2"
                max="32"
                bind:value={APP_OPTIONS.tilesFontSize}
            />
        </label>
    </fieldset>
</div>



<style>
    fieldset {
        margin : 0 ;
        padding : .2rem .5rem .4rem .5rem ;

        display : flex ;
        flex-direction : column ;
        align-items : flex-start ;
        gap : .5rem ;

        border : 2px solid var(--app-accent-color) ;
        border-radius : calc(var(--spacing) * 2) ;
    }
    fieldset > legend {
        padding : 0 calc(var(--spacing) * 1) ;
    }

    select {
        border-bottom : 2px solid var(--app-accent-color) ;
    }

    input[type="number"] {
        width : 3em ;
    }
</style>
