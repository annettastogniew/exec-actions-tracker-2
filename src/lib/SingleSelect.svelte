<script>
    let {optionsAndValues} = $props();
    import { filter } from "./state.svelte";

    $inspect(filter);

    const changeFilter = event => {
        const selectedDate = event.currentTarget.value;
        filter["Date"] = selectedDate;
    };
</script>

<div>
    <select onchange={e => changeFilter(e)} class="plain-select">
        {#each Object.keys(optionsAndValues) as option}
            {#if option === "This week"}
                <option value={optionsAndValues[option]} selected>{option}</option>
            {:else}
                <option value={optionsAndValues[option]}>{option}</option>
            {/if}
        {/each}
    </select>
</div>

<style>
    .plain-select {
        border: none;
        border-bottom: 1px solid #d3d3d3;
        width: 100vw;
        font-size: 17px;
        color: #484848;
        padding: 5px;
    }
</style>