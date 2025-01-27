<script>
    import { ChevronDown, ChevronUp, XLg } from "svelte-bootstrap-icons";
    import { filter } from "./state.svelte";
    import { slide } from "svelte/transition";
    let { col, options, multiple } = $props();

    let optionsObject =
            typeof options === "object" &&
            !Array.isArray(options) &&
            options !== null,
        showDropdown = $state(false),
        filteredOptions = $derived(
            multiple
                ? options.filter((option) => !filter[col].includes(option))
                : optionsObject
                  ? Object.keys(options).filter(
                        (option) => filter[col] !== option,
                    )
                  : options.filter((option) => filter[col] !== option),
        );

    const toggleDropdown = () => {
        showDropdown = !showDropdown;
    };

    const addOption = (option) => {
        filter[col].push(option);
    };

    const addAllOptions = () => {
        filteredOptions.map((option) => filter[col].push(option));
        toggleDropdown();
    };

    const removeOption = (option) => {
        filter[col] = filter[col].filter((selection) => selection !== option);
    };

    const changeFilter = (option) => {
        filter[col] = option;
        toggleDropdown();
    };

    console.log(options)
</script>

<main>
    <div class="select">
        <div class="selected-items">
            {#if multiple}
                {#each filter[col] as selectedItem}
                    <div class="selected-item">
                        {selectedItem}<button
                            onclick={() => removeOption(selectedItem)}
                            ><XLg fill={"#484848"} /></button
                        >
                    </div>
                {/each}
            {:else}
                <div class="selected">
                    {optionsObject
                        ? Object.keys(options).find(
                              (key) => options[key] === filter[col],
                          )
                        : filter[col]}
                </div>
            {/if}
        </div>
        {#if showDropdown}
            <button onclick={toggleDropdown}
                ><ChevronUp width={18} height={18} fill={"#949494"} /></button
            >
        {:else}
            <button onclick={toggleDropdown}
                ><ChevronDown width={18} height={18} fill={"#949494"} /></button
            >
        {/if}
    </div>
    {#if showDropdown}
        <div class="dropdown" transition:slide>
            {#if filteredOptions.length > 0}
                <div class="dropdown-options">
                    {#each filteredOptions as option}
                        <button
                            class={!multiple && (options[option] === filter[col]) ? "dropdown-option selected-option" : "dropdown-option"}
                            onclick={() =>
                                multiple
                                    ? addOption(option)
                                    : optionsObject
                                      ? changeFilter(options[option])
                                      : changeFilter(option)}>{option}</button
                        >
                    {/each}
                    {#if multiple}
                        <button class="dropdown-option" onclick={addAllOptions}
                            >All</button
                        >
                    {/if}
                </div>
            {:else}
                <div class="no-options"><em>All options selected.</em></div>
            {/if}
        </div>
    {/if}
</main>

<style>
    button {
        background-color: transparent;
        border: none;
    }

    .select {
        width: 96vw;
        border-bottom: 1px solid #d3d3d3;
        display: flex;
        justify-content: space-between;
    }

    .selected-item {
        background-color: #ededed;
        border: 1px solid #c6c6c6;
        color: #484848;
        border-radius: 10px;
        padding: 6px 10px;
        margin-bottom: 5px;
        align-items: center;
        display: flex;
        gap: 5px;
    }

    .selected-items {
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        margin-bottom: 5px;
    }

    .selected {
        color: #484848;
        padding: 5px;
        font-size: 18px;
    }

    .dropdown-options {
        display: flex;
        flex-direction: column;
        align-items: start;
        border: 1px solid #c6c6c6;
        border-top: none;
        border-radius: 0 0 7px 7px;
        width: 96vw;
    }

    .dropdown-option {
        text-align: start;
        width: 100%;
        padding: 5px;
        color: #484848;
        cursor: pointer;
    }

    .dropdown-option:hover {
        color: #949494;
    }

    .no-options {
        margin-top: 5px;
        color: #d22b2b;
    }

    .selected-option {
        background-color: #d3d3d3;
    }
</style>
