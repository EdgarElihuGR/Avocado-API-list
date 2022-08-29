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
    appNode.className = 'grid xl:grid-cols-2 gap-4 justify-center px-3';
    // Create DOM fragment to avoid live DOM rendering multiple times
    let domFragment = document.createDocumentFragment();

    allItems.forEach((item) => {
        const imageNode = document.createElement('img');
        imageNode.src = `${domainURL}${item.image}`;
        imageNode.className = 'max-w-xs max-h-80 rounded-full p-5';
        const priceNode = document.createElement('h2');
        
        /* Diff ways to set styles */
        // priceNode.setAttribute('class', 'text-stone-900 text-2xl');
        // priceNode.style = 'font-size: 3rem';
        // priceNode.style.fontSize = '3rem';
        priceNode.className = 'title-text';

        priceNode.textContent = item.price;
        priceNode.style.color = '#779422';
        const descriptionNode = document.createElement('p');
        descriptionNode.textContent = item.attributes.description;
        descriptionNode.className = "mt-4 max-w-2xl text-lg leading-7 text-gray-500";
        const detailsContainer = document.createElement('div');
        detailsContainer.setAttribute('class', 'details-container');
        detailsContainer.setAttribute('class', 'px-6 py-3');
        detailsContainer.append(priceNode, descriptionNode);
        const container = document.createElement('div');
        container.className = "container flex flex-column rounded-3xl hover:bg-gray-300 ease-in duration-200";
        container.append(imageNode, detailsContainer);
        // Append new container to fragment (Not the live DOM)
        appNode.append(container);
    })
    // Append the fragment to the live DOM just once (More optimal)
    document.body.append(appNode);
}

fetchData();