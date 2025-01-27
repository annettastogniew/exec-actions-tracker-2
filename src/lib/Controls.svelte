<script>
    import { allActions } from './state.svelte';
    import MultiSelect from './MultiSelect.svelte';
    import { filter } from './state.svelte';
    
    let actionTypes = [ ...new Set(allActions["data"].map(action => action["Category"]))],
        topics = [ ...new Set(allActions["data"].map(action => action["Primary tag"]))],
        timeSpans = {
            "Today": new Date().getTime(), 
            "This week": filter["Date"], 
            "Since Jan. 20": new Date("1/20/2025").getTime()
        };
</script>

<main>
    <h2>Explore executive actions</h2>
    <div id="select-type">
        <p>Show me...</p>
        <MultiSelect options={actionTypes} col="Category" multiple={true}/>
    </div>
    <div id="select-topic">
        <p>about...</p>
        <MultiSelect options={topics} col="Primary tag" multiple={true}/>
    </div>
    <div id="select-date">
        <p>issued...</p>
        <MultiSelect options={timeSpans} col="Date" multiple={false}/>
    </div>
</main>

<style>
    main {
        margin-bottom: 10px;
    }
</style>
