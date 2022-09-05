/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
/* Avocados API */
const apiURL = 'https://platzi-avo.vercel.app/api/avo';
const domainURL = 'https://platzi-avo.vercel.app'; 
const updateButton = document.querySelector('#updateDetails');
const dialog = document.querySelector('#favDialog');
const confirmBtn = document.querySelector('#confirmBtn');
const skeleton = document.querySelector('#skeleton');
const header = document.querySelector('#header');
const menu = header.querySelector('.menu');
let allItems = [];
let selectedMenuOption;

/* Functions */
const highLightHandler = (event) => {
    let target = event.target;
    if(target.nodeName === 'A'){
        event.preventDefault();
        console.log('Is an anchor');
    }
    if(selectedMenuOption){
        selectedMenuOption.classList.remove('highlighted');
    }
    selectedMenuOption = target;
    selectedMenuOption.classList.add('highlighted');
} 

const formatPrice = (price) => {
    const formattedPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return formattedPrice;
};

/* Listeners */
menu.addEventListener('click', highLightHandler);

/* Fetch data (async-await) */
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

        priceNode.textContent = formatPrice(item.price);
        priceNode.style.color = '#779422';
        const descriptionNode = document.createElement('p');
        descriptionNode.textContent = item.attributes.description;
        descriptionNode.className = "mt-4 max-w-2xl text-lg leading-7";
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'details-container';
        detailsContainer.className = 'px-6 pt-3 pb-5';
        detailsContainer.append(priceNode, descriptionNode);
        /* Container */
        const container = document.createElement('div');
        container.className = "container flex flex-column rounded-3xl text-gray-500 hover:bg-gray-300 hover:text-black ease-in duration-200";
        /* Append item details to container */
        container.append(imageNode, detailsContainer);
        // Append new container to fragment (Not the live DOM)
        appNode.append(container);
    })
    // Append the fragment to the live DOM just once (More optimal)
    document.body.append(appNode);
    /* Remove page skeleton */
    skeleton.remove();
}
fetchData();

/* MDN Async guide */
// const fetchPromise = fetch(apiURL);
// const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
// const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
// const fetchPromise3 = fetch('bad-scheme://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');
// const promises = [fetchPromise1, fetchPromise2, fetchPromise3];
// console.info('/* Promises */');

// Promise.all(promises)
//     .then((responses) => {
//         for (const response of responses) {
//             console.log(`${ response.url }: ${ response.status }`);
//         }
//     })
//     .catch((error) => {
//         console.error(`Failed to fetch: ${ error }`);
//     });

    
// Promise.any(promises)
//     .then((responses) => {
//         for (const response of responses) {
//             console.log(`${ response.url }: ${ response.status }`);
//         }
//     })
//     .catch((error) => {
//         console.error(`Failed to fetch: ${ error }`);
//     });

// fetchPromise
//     .then((response) => {
//         if(!response.ok){
//             throw new Error(`HTTP error: ${ response.status }`);
//         }
//         return response.json();
//     })
//     .then((data) => {
//         console.log(data.data[0].name);
//     })
//     .catch((error) => {
//         console.error(`Could not get items: ${ error }`);
//     });

// console.log('Started request...');
