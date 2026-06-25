<script lang="ts">
    import { APP_OPTIONS } from '../lib/shared.svelte';
</script>



<div class="min-w-100 flex flex-col gap-4">
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
            <input
                type="checkbox"
                bind:checked={APP_OPTIONS.split.isSplit}
            />
        </label>

        {#if APP_OPTIONS.split.isSplit && APP_OPTIONS.split.language === 'none'}
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
