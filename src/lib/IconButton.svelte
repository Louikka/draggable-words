<script lang="ts">
    interface _Props {
        style?: string;
        onclick?: () => any;
        title?: string;
        icon: {
            src?: string;
            size?: number;
        };
    }

    let { style, onclick, title, icon, }: _Props = $props();
</script>



<div class="__button-wrapper__">
    <input
        type="button"
        {style}
        {onclick}
        {title}

        style:background-image="url({`"${icon.src}"`})"
        style:background-size="{(icon.size ?? 0.8) * 100}%"
    />
</div>



<style>
    .__button-wrapper__ {
        /**/
    }

    input,
    button {
        width : 2.4rem ;
        aspect-ratio : 1/1 ;
        padding : 0 ;

        display : block ;

        background-color : transparent ;
        /* background-image : var() ; */
        background-position : center ;
        background-repeat : no-repeat ;
        /* background-size : 80% ; */
        border-radius : calc(var(--spacing) * 2) ;
    }
    :is(input, button):hover,
    :is(input, button):active {
        background-color : var(--color-gainsboro) ;
    }
</style>
