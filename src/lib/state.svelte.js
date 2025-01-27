let today = new Date();
today.setDate(today.getDate() - today.getDay());
let todayDate = today.getTime();
export const filter = $state({
    "Category": ["Executive orders"],
    "Primary tag": ['Other', 'DEI', 'Immigration', 'Crime', 'LGBTQ+', 'Government agencies', 'Foreign affairs', 'Energy', 'Economy', 'Environment'],
    "Date": todayDate
});

export const allActions = $state({"data": []});

