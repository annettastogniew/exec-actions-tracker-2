<script>
    import { filter } from "./state.svelte";
    let { col, options, multiple } = $props();

    const toggleFilter = (option) => {
        if (multiple) {
            if (filter[col].includes(option)) {
                filter[col] = filter[col].filter(
                    (selection) => selection !== option,
                );
            } else {
                filter[col].push(option);
            }
        } else {
            filter[col] = option;
        }
    };

    const selectAll = () => {
        filter[col] = options;
    };

    const removeAll = () => {
        filter[col] = [];
    };
</script>

<main>
    <div class="btn-container">
        {#if multiple}
            {#each options as option}
                <button
                    onclick={() => toggleFilter(option)}
                    class={filter[col].includes(option) ? "select-btn selected" : "select-btn"}
                    >{option}</button
                >
            {/each}
        {:else}
            {#each Object.keys(options) as option}
                <button
                    onclick={() => toggleFilter(options[option])}
                    class={filter[col] === options[option] ? "select-btn selected" : "select-btn"}
                    >{option}</button
                >
            {/each}
        {/if}
    </div>
    {#if multiple}
        <div class="small-ctrls">
            <button class={filter[col].length === options.length ? "ctrl-btn clicked" : "ctrl-btn"} onclick={selectAll}>All</button>
            <button class={filter[col].length === 0 ? "ctrl-btn clicked" : "ctrl-btn"} onclick={removeAll}>None</button>
        </div>
    {/if}
</main>

<style>
    .select-btn {
        background-color: #ededed;
        border: 1px solid #c6c6c6;
        color: #484848;
        border-radius: 10px;
        padding: 6px 10px;
        margin-bottom: 5px;
        align-items: center;
        display: flex;
        gap: 5px;
        font-size: 14px;
        cursor: pointer;
    }

    .select-btn:hover {
        background-color: #d3d3d3;
    }

    .select-btn.selected {
        background-color: #295475;
        color: #ffffff;
        border: 1px solid #081017;
    }

    .ctrl-btn {
        background-color: transparent;
        border: none;
        text-decoration: underline;
        color: #838383;
        font-size: 14px;
        margin: 0;
        cursor: pointer;
    }

    .ctrl-btn.clicked {
        color: #000000;
    }

    .small-ctrls {
        display: flex;
    }

    .btn-container {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
    }
</style>
