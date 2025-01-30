let today = new Date();
today.setDate(today.getDate() - today.getDay());
let todayDate = today.getTime(); 
export const filter = $state({
    "Category": ["Executive orders"],
    "Primary tag": [],
    "Date": todayDate
});

export const allActions = $state({"data": []});

