/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
// Avocados API
const apiURL = 'https://platzi-avo.vercel.app/api/avo';
const domainURL = 'https://platzi-avo.vercel.app'; 
let allItems = [];
// Fetch data (async-await)
async function fetchData(){
    const response = await fetch(apiURL);
    const data = await response.json();
    allItems = await data.data;
    allItems.forEach((item) => {
        console.log(item.name);
        const image = document.createElement('img');
        image.src = `${domainURL}${item.image}`;

        document.body.append(image);
    })
}

fetchData();