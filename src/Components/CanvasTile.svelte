<script lang="ts">
    import { onMount } from 'svelte';

    import { APP_OPTIONS } from '../lib/shared.svelte';
    import { generateRandomPosition, makeElementDraggable } from '../lib/utils';


    interface _Props {
        value: string;
        initPosition?: Position;
    }

    let { value, initPosition }: _Props = $props();


    let e: HTMLElement;

    let isDraggable = $state(false);
    let isFound = $state(false);


    onMount(() =>
    {
        initPosition ??= generateRandomPosition(e);

        makeElementDraggable(e);
        isDraggable = true;
    });
</script>



<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="ui-w-shadow { isDraggable ? 'draggable' : '' }  absolute px-3 py-2 bg-white rounded-lg select-none"

    style:top="{initPosition?.y}px"
    style:left="{initPosition?.x}px"
    style:background-color={ isFound ? '#6ce01f' : 'white' }
    style:font-size="calc(.25rem*{APP_OPTIONS.tilesFontSize})"

    bind:this={e}

    ondblclick={() => isFound = !isFound }
>
    <span>{value}</span>
</div>



<style>
    .draggable {
        cursor : pointer ;
    }
</style>
