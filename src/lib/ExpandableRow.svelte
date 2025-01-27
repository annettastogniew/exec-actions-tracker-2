<script>
    import { ChevronDown, ChevronUp } from "svelte-bootstrap-icons";
    import { slide } from 'svelte/transition';

    export let rowInfo;

    let expand = false;
    $: borderRadius = expand ? "7px 7px 0px 0px" : "7px";
    $: margin = expand ? "3px 0px 0px" : "3px 0px";

    const expandRow = () => {
        expand = !expand;
    };

    const link = action => {
        const dateParts = action["Date"].split("/");
        const year = dateParts[2];
        const month = dateParts[0].padStart(2, '0');
        const formattedName = action["Name"].replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '').toLowerCase().replace(/\s+/g, '-');
        return `https://www.whitehouse.gov/presidential-actions/${year}/${month}/${formattedName}/`;
    };
</script>

<tr>
    <td class="exec-action" style:border-radius={borderRadius} style:margin={margin}
        ><button class="row-button" on:click={() => expandRow()}
            >{rowInfo["Slug"]}
            {#if expand}
                <ChevronUp width={18} height={18} fill={"#1c394f"} />
            {:else}
                <ChevronDown width={18} height={18} fill={"#1c394f"} />
            {/if}
            </button
        ></td
    >
</tr>
{#if expand}
    <tr transition:slide class="expanded-row">
        <td class="expanded-info">
            <p class="action-name">{rowInfo["Name"]}</p>
            <p class="action-date">{rowInfo["Date"]}</p>
            <p>{@html rowInfo["Summary"]}</p>
            <p><a href={link(rowInfo)}>Read more</a></p>
            {#if rowInfo["Legal Challenges"]}
                <p class="info-heading">Legal Challenges</p>
                {@html rowInfo["Legal Challenges"]}
            {/if}
        </td>
    </tr>
{/if}

<style>
    p {
        color: #1c394f;
        font-size: 15px;
        margin: 10px 0;
    }

    button {
        background-color: #cfe4f4;
        border: none;
    }

    a {
        color: #0047AB;
    }

    a:visited,
    a:hover,
    a:active {
        color: #0f00ab;
    }

    .exec-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #cfe4f4;
        border: 1px solid #a5c6df;
        padding: 10px 15px;
        font-size: 18px;
        color: #1c394f;
    }

    .expanded-info {
        padding: 0 15px;
        background-color: #f0f7fb;
        border: 1px solid #a5c6df;
        border-radius: 0px 0px 7px 7px;
        border-top: 0;
    }

    .expanded-row {
        display: block;
        margin-bottom: 3px !important;
        width: 96vw !important;
    }

    .action-name {
        font-size: 17px;
        font-style: italic;
    }

    .info-heading {
        margin-bottom: 5px;
    }

    .row-button {
        width: 100%;
        display: flex;
        justify-content: space-between;
        color: #1c394f;
    }

    .action-date {
        font-size: 14px;
        margin-top: -5px;
    }
</style>
