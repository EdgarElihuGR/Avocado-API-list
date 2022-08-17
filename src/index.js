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
    const appNode = document.querySelector('#app');
    // Create DOM fragment to avoid live DOM rendering multiple times
    let domFragment = document.createDocumentFragment();

    allItems.forEach((item) => {
        const imageNode = document.createElement('img');
        imageNode.src = `${domainURL}${item.image}`;
        const priceNode = document.createElement('h2');
        priceNode.setAttribute('class', 'text-stone-900 text-2xl');
        priceNode.textContent = item.price;
        const descriptionNode = document.createElement('p');
        descriptionNode.textContent = item.attributes.description;
        descriptionNode.setAttribute("class", "mt-4 max-w-2xl text-xl leading-7 text-gray-500");
        const detailsContainer = document.createElement('div');
        detailsContainer.setAttribute('class', 'details-container');
        detailsContainer.setAttribute('class', 'px-5');
        detailsContainer.append(priceNode, descriptionNode);
        const container = document.createElement('div');
        container.setAttribute("class", "container");
        container.append(imageNode, detailsContainer);
        // Append new container to fragment (Not the live DOM)
        appNode.append(container);
    })
    // Append the fragment to the live DOM just once (More optimal)
    document.body.append(appNode);
}

fetchData();