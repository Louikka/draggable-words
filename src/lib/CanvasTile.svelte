<script lang="ts">
    import { onMount } from 'svelte';
    import { generateRandomPosition, makeElementDraggable } from '../utils';
    import { APP_OPTIONS } from '../shared.svelte';


    interface _Props {
        value: string;
        initPosition?: Position;
    }

    let { value, initPosition }: _Props = $props();


    let e: HTMLElement;

    let isDraggable = $state(false);
    let isFound = $state(false);

    // initPosition ??= {
    //     x : 0,
    //     y : 0,
    // };


    onMount(() =>
    {
        initPosition ??= generateRandomPosition(e);

        makeElementDraggable(e);
        isDraggable = true;
    });
</script>



<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="tile { isDraggable ? 'draggable' : '' } { isFound ? 'found' : '' }"

    style:top="{initPosition?.y}px"
    style:left="{initPosition?.x}px"
    style:font-size="calc(var(--spacing) * {APP_OPTIONS.tilesFontSize})"

    bind:this={e}

    ondblclick={() => isFound = !isFound }
>
    <span>{value}</span>
</div>



<style>
    .tile {
        position : absolute ;

        padding : calc(var(--spacing) * 2) calc(var(--spacing) * 3) ;

        background-color : var(--color-white) ;
        border-radius : calc(var(--spacing) * 2) ;

        font-size : calc(var(--spacing) * 4) ;
    }
    .tile.found {
        background-color : var(--color-green) ;
    }

    .draggable {
        cursor : pointer ;
    }
</style>
