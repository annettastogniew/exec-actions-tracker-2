let d = new Date();
d.setDate(d.getDate() - 10);
export const filter = $state({
    "Category": ["Executive orders"],
    "Primary tag": [],
    "Date": d.getTime()
});

export const allActions = $state({"data": []});

