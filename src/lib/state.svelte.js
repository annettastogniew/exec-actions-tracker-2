/*let today = new Date();
today.setDate(today.getDate() - today.getDay());
let todayDate = today.getTime();*/
let jan20Date = new Date("1/20/2025").getTime();
export const filter = $state({
    "Category": ["Executive orders"],
    "Primary tag": ['Other', 'DEI', 'Immigration', 'Crime', 'LGBTQ+', 'Government agencies', 'Foreign affairs', 'Energy', 'Economy', 'Environment'],
    "Date": jan20Date
});

export const allActions = $state({"data": []});

