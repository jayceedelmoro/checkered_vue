<template>
    <TextOutline />
    <div class="container">
        <div class='left column'>
            <h2>
                Check your Productivity!
            </h2>
        </div>

        <div class='right column'>
            <h2>
                CHECKERED
            </h2>
            <div>
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        place-items: center;
        max-width: 70%;
        padding: 2rem;
        margin: 0 auto;
    }

    .container .column {
        width: 100%;
        padding: 50px;
    }

    .right.column {
        background: var(--main-color);
        border-radius: 25px;
    }

    h2 {
        color: var(--main-color);
        font-size: 90px;
        margin: 0;
        /* filter:url(#stroke-text-svg-filter); */
        /* -webkit-text-stroke: 1px var(--white); */
        /* -webkit-text-fill-color: var(--main-color); */
        text-shadow: 0 0 20px var(--white), 0 0 20px var(--white), 0 0 20px var(--white), 0 0 20px var(--white);
    }
</style>