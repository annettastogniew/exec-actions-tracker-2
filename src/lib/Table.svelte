<script>
    import ExpandableRow from "./ExpandableRow.svelte";
    import { allActions, filter } from './state.svelte';

    const filterData = action => {
        const filters = Object.keys(filter).filter(col => col !== "Date");
        const categoryAndPrimaryTag = filters.map(col => filter[col].includes(action[col])).every(Boolean);
        const date = filter["Date"] <= new Date(action["Date"]).getTime();
        return categoryAndPrimaryTag && date;
    }

    const selectedActions = $derived(allActions["data"].filter(action => filterData(action)));

</script>

<main>
    {#if selectedActions.length > 0}
        <table style:border-spacing={"0"}>
            <tbody>
                {#each selectedActions as action}
                    <ExpandableRow rowInfo={action}/>
                {/each}
            </tbody>
        </table>
    {/if}
</main>

<style>
    main {
        height: 350px;
        overflow: scroll;
    }

    table {
        width: 96vw !important;
    }
</style>
