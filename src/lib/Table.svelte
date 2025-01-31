<script>
    import ExpandableRow from "./ExpandableRow.svelte";
    import { allActions, filter } from './state.svelte';
    import { ExclamationTriangle } from "svelte-bootstrap-icons";

    const filterData = action => {
        const filters = Object.keys(filter).filter(col => col !== "Date");
        const categoryAndPrimaryTag = filters.map(col => filter[col].includes(action[col])).every(Boolean);
        const date = filter["Date"] <= new Date(action["Date"]).getTime();
        return categoryAndPrimaryTag && date;
    }

    const selectedActions = $derived(allActions["data"].filter(action => filterData(action)));
    let currentCount = $derived(selectedActions.length),
        totalCount = allActions["data"].length;

</script>

<main>
    {#if selectedActions.length > 0}
    <p class="table-msg">Showing {currentCount} out of {totalCount} total actions. Actions marked with <ExclamationTriangle height={14} width={14}/> have been legally challenged or blocked.</p>
        <table style:border-spacing={"0"}>
            <tbody>
                {#each selectedActions as action}
                    <ExpandableRow rowInfo={action}/>
                {/each}
            </tbody>
        </table>
    {:else}
        <p class="none-msg"><em>No executive actions match your specifications.</em></p>
    {/if}
</main>

<style>
    table {
        width: 98vw !important;
        margin: auto;
    }

    .none-msg {
        color: #484848;
    }
    
    .table-msg {
        color: #484848;
        font-size: 14px;
    }
</style>
