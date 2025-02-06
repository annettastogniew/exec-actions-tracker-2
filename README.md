# Run project
After downloading, run `npm install`.

Run `npm run dev` and go to [http://localhost:5173/](http://localhost:5173/).

To bundle files, run `npm run build`. Bundled files (what you'd upload to Akamai) will be in the `dist` folder.

# Project structure
The overall parent component is App.svelte.

## Custom components
- Controls.svelte
    - Filters for the executive actions
    - Used in App.svelte
- SelectButtons.svelte
    - Buttons used to filter actions
    - Used in Controls.svelte
    - Props:
        - col: The column in the spreadsheet that the buttons filter
        - options: The different filter options for that column
        - multiple: Whether multiple options can be selected
- Table.svelte
    - List of executive actions
    - Used in App.svelte
- ExpandableRow.svelte
    - Each action in the list of executive actions
    - Used in Table.svelte
    - Props: 
        - rowInfo: The data for this particular row

- MultiSelect.svelte - multi-select component (not used in final version)

## State variables
- filter: filters applied to the executive actions
- allActions: the full dataset of actions, loaded from the [Google Sheet](https://docs.google.com/spreadsheets/d/1CjAlGZPrIzOG1Yj8up6ibMhOlIUYq_Z_1MqcHA7aVwA/edit?gid=0#gid=0)
