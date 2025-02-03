<script>
    import { allActions } from "./state.svelte";
    import SelectButtons from "./SelectButtons.svelte";
    import { filter } from "./state.svelte";

    let actionTypes = [
            "Executive orders",
            "Proclamations",
            "Memorandums",
            "Other documents",
        ],
        topics = [
            ...new Set(
                allActions["data"].map((action) => action["Primary tag"]),
            ),
        ],
        timeSpans = {
            "Past 10 days": filter["Date"],
            "Since Jan. 20": new Date("1/20/2025").getTime(),
        };
    $inspect(filter["Date"])

    filter["Primary tag"] = topics;
</script>

<main>
    <div class="ctrl-section" id="select-type">
        <p class="prompt">SHOW ME...</p>
        <SelectButtons options={actionTypes} col="Category" multiple={true} />
    </div>
    <div class="ctrl-section" id="select-topic">
        <p class="prompt">ABOUT...</p>
        <SelectButtons options={topics} col="Primary tag" multiple={true} />
    </div>
    <div class="ctrl-section" id="select-date">
        <p class="prompt">ISSUED...</p>
        <SelectButtons options={timeSpans} col="Date" multiple={false} />
    </div>
</main>

<style>
    main {
        margin-bottom: 25px;
    }

    .prompt {
        font-weight: 400;
        font-family: "ArtHouseCondensed";
        margin-bottom: 7px;
        font-size: 18px;
    }

    .ctrl-section {
        padding-bottom: 10px;
        border-bottom: 1px dotted #ccc;
    }
</style>
