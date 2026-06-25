<script lang="ts">
    import * as simiSyllable from 'simi-syllable';

    import { sliceStringByLetters } from '../lib/utils';
    import { APP_OPTIONS } from '../lib/shared.svelte';


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



<form
    class="flex flex-col gap-2"
    onsubmit={onFormSubmit}
>
    <div>
        <span>Enter words here. Use spaces to separate them.</span>
    </div>
    <div class="my-1 flex items-center gap-2">
        <input
            class="ui-input-text  px-1 py-0.5"
            name="form_input_text"
            type="text"
            placeholder="Type here..."
        />
        <input
            class="ui-button  px-2 py-1"
            type="submit"
            value="Submit"
        />
    </div>
</form>



<style></style>
