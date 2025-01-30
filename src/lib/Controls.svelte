<script>
    import { allActions } from "./state.svelte";
    import MultiSelect from "./MultiSelect.svelte";
    import SelectButtons from "./SelectButtons.svelte";
    import { filter } from "./state.svelte";

    let actionTypes = ["Executive orders", "Proclamations", "Memorandums", "Other documents"],
        topics = [
            ...new Set(
                allActions["data"].map((action) => action["Primary tag"]),
            ),
        ],
        timeSpans = {
            "This week": filter["Date"],
            "Since Jan. 20": new Date("1/20/2025").getTime(),
        };

    filter["Primary tag"] = topics;
</script>

<main>
    <h2>Explore executive actions</h2>
    <div id="select-type">
        <p class="prompt">Show me...</p>
        <SelectButtons options={actionTypes} col="Category" multiple={true} />
    </div>
    <div id="select-topic">
        <p class="prompt">about...</p>
        <SelectButtons options={topics} col="Primary tag" multiple={true} />
    </div>
    <div id="select-date">
        <p class="prompt">issued...</p>
        <SelectButtons options={timeSpans} col="Date" multiple={false} />
    </div>
</main>

<style>
    main {
        margin-bottom: 25px;
    }
</style>
