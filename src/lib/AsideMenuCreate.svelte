<script lang="ts">
    import * as simiSyllable from 'simi-syllable';

    import { sliceStringByLetters } from '../utils';
    import { APP_OPTIONS } from '../shared.svelte';


    interface _Props {
        canvasTilesCollection: string[];
    }

    let { canvasTilesCollection = $bindable() }: _Props = $props();


    function onFormSubmit(ev: SubmitEvent)
    {
        ev.preventDefault();

        const form = ev.currentTarget as HTMLFormElement;
        const formInputText = form['form_input_text'] as HTMLInputElement;

        for (let word of formInputText.value.trim().split(' ').filter(s => s !== ''))
        {
            if (APP_OPTIONS.split.isSplit)
            {
                if (APP_OPTIONS.split.language === 'en')
                {
                    canvasTilesCollection.push(...simiSyllable.syllabifyEn(word));
                }
                else if (APP_OPTIONS.split.language === 'es')
                {
                    canvasTilesCollection.push(...simiSyllable.syllabifyEs(word));
                }
                else
                {
                    canvasTilesCollection.push(...sliceStringByLetters(word, APP_OPTIONS.split.byNoOfChars));
                }
            }
            else
            {
                canvasTilesCollection.push(word);
            }
        }

        formInputText.value = '';
    }
</script>



<form class="__wrapper__" onsubmit={onFormSubmit}>
    <div>
        <span>Enter words here. Use spaces to separate them.</span>
    </div>
    <div class="input-fields">
        <input
            name="form_input_text"
            type="text"
            placeholder="Type here..."
            style="border-bottom:2px solid var(--color-softblue-light)"
        />
        <input
            type="submit"
            value="Submit"
        />
    </div>
</form>



<style>
    .__wrapper__ {
        display : flex ;
        flex-direction : column ;
        gap : .5rem ;
    }

    .input-fields {
        margin : .3rem 0 ;

        display : flex ;
        gap : .5rem ;
    }

    input[type="button"],
    input[type="submit"],
    button {
        padding : .3em .59em ;

        display : block ;

        background-color : transparent ;
        border-radius : .5rem ;
    }
    :is(input[type="button"], input[type="submit"], button):hover,
    :is(input[type="button"], input[type="submit"], button):active {
        background-color : var(--color-gainsboro) ;
    }
</style>
