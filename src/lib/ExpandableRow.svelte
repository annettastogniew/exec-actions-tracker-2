<script>
    import {
        ChevronDown,
        ChevronUp,
        ExclamationTriangle,
    } from "svelte-bootstrap-icons";
    import { slide } from "svelte/transition";

    export let rowInfo;

    let expand = false;
    $: borderRadius = expand ? "7px 7px 0px 0px" : "7px";
    $: margin = expand ? "3px 0px 0px" : "3px 0px";

    const expandRow = () => {
        expand = !expand;
    };

    const link = (action) => {
        const dateParts = action["Date"].split("/");
        const year = dateParts[2];
        const month = dateParts[0].padStart(2, "0");
        const formattedName = action["Name"]
            .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "-");
        return `https://www.whitehouse.gov/presidential-actions/${year}/${month}/${formattedName}/`;
    };
</script>

<tr>
    <td class="exec-action" style:border-radius={borderRadius} style:margin
        ><button class="row-button" on:click={() => expandRow()}
            ><div class="action-info">
                {rowInfo["Slug"]}
                {#if rowInfo["Status"] !== ""}
                    <ExclamationTriangle width={18} height={18} />
                {/if}
            </div>
            <div class="action-info">
                <p>{rowInfo["Date"]}</p>
                {#if expand}
                    <ChevronUp width={18} height={18} fill={"#1c394f"} />
                {:else}
                    <ChevronDown width={18} height={18} fill={"#1c394f"} />
                {/if}
            </div>
        </button></td
    >
</tr>
{#if expand}
    {#if rowInfo["On White House Site"] === "Yes"}
        <tr transition:slide class="expanded-row">
            <td class="expanded-info">
                <p class="action-name">{rowInfo["Name"]}</p>
                <p>{@html rowInfo["Summary"]}</p>
                <p class="read-more">
                    <a href={link(rowInfo)} target="blank">Read more</a>
                </p>
                {#if rowInfo["Status"] !== ""}
                    <div class="challenges">
                        <ExclamationTriangle width={18} height={18} />
                        <p class="status-msg">
                            This action has been {rowInfo["Status"].toLowerCase()}.
                        </p>
                    </div>
                {/if}
                {#if rowInfo["Legal Challenges"]}
                    <p class="info-heading">Legal Challenges</p>
                    {@html rowInfo["Legal Challenges"]}
                {/if}
            </td>
        </tr>
    {:else}
    <tr transition:slide class="expanded-row">
        <td class="expanded-info">
            <p class="no-details-msg"><em>Further details not yet available.</em></p>
        </td>
    </tr>
    {/if}
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
        color: #0047ab;
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
        padding: 5px 15px;
        font-size: 18px;
        color: #1c394f;
    }

    .expanded-info {
        padding: 0 15px;
        background-color: #f0f7fb;
        border: 1px solid #a5c6df;
        border-radius: 0px 0px 7px 7px;
        border-top: 0;
        width: 100vw !important;
    }

    .expanded-row {
        display: block;
        margin-bottom: 3px !important;
    }

    .action-name {
        font-size: 17px;
        font-style: italic;
        font-weight: 400;
    }

    .info-heading {
        margin-bottom: 5px;
    }

    .row-button {
        width: 100%;
        align-items: center;
        display: flex;
        justify-content: space-between;
        color: #1c394f;
    }

    .read-more {
        margin-top: 10px;
        margin-bottom: 25px;
    }

    .action-info {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .status-msg,
    .info-heading {
        font-weight: 400;
    }

    .challenges {
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .no-details-msg {
        margin-bottom: 15px;
    }
</style>
