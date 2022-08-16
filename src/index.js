/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
// Avocados API
const url = 'https://platzi-avo.vercel.app/api/avo';
let allItems = [];
// Fetch data (async-await)
async function fetchData(){
    const response = await fetch(url);
    const data = await response.json();
    allItems = await [...data.data];
    allItems.forEach((item) => console.log(item.name));
}

fetchData();