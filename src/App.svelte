<script>
  import Controls from "./lib/Controls.svelte";
  import Papa from "papaparse";
  import Table from "./lib/Table.svelte";
  import { onMount } from "svelte";
  import { allActions } from "./lib/state.svelte.js";

  let allData = [],
    config = buildConfig();

  function buildConfig() {
    return {
      delimiter: "", // auto-detect
      newline: "", // auto-detect
      quoteChar: '"',
      escapeChar: '"',
      header: false,
      transformHeader: undefined,
      dynamicTyping: false,
      preview: 0,
      encoding: "",
      worker: false,
      comments: false,
      step: undefined,
      complete: undefined,
      error: undefined,
      download: false,
      downloadRequestHeaders: undefined,
      downloadRequestBody: undefined,
      skipEmptyLines: false,
      chunk: undefined,
      chunkSize: undefined,
      fastMode: undefined,
      beforeFirstChunk: undefined,
      withCredentials: undefined,
      transform: undefined,
      delimitersToGuess: [",", "\t", "|", ";", Papa.RECORD_SEP, Papa.UNIT_SEP],
    };
  }

  onMount(() =>
    Papa.parse(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTTjltGfJpjkiRuPRGqRk1x5fxAw4g-cTQ3JE7BamgItYM-zfSA4PT97Bl2L7nWqVpFialzTD_x4nJM/pub?gid=0&single=true&output=csv",
      {
        download: true,
        header: true,
        config,
        complete: function (results) {
          allData = results.data;
          allActions["data"] = allData;
        },
      },
    ),
  );
</script>

<main>
  {#if allData.length > 0}
    <Controls />
    <Table />
  {/if}
</main>

<style>
</style>
