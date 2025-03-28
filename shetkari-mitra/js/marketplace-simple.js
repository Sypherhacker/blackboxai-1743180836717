// SIMPLE MARKETPLACE IMPLEMENTATION
console.log('MARKETPLACE: Script loaded - starting initialization');

// Create visible debug panel
const debugPanel = document.createElement('div');
debugPanel.style.position = 'fixed';
debugPanel.style.bottom = '0';
debugPanel.style.left = '0';
debugPanel.style.right = '0';
debugPanel.style.background = '#333';
debugPanel.style.color = 'white';
debugPanel.style.padding = '10px';
debugPanel.style.zIndex = '9999';
debugPanel.innerHTML = '<h3>Marketplace Debug Console</h3>';
document.body.appendChild(debugPanel);

function logDebug(message) {
    console.log('MARKETPLACE:', message);
    debugPanel.innerHTML += `<div>${new Date().toLocaleTimeString()}: ${message}</div>`;
}

// Main initialization
function initMarketplace() {
    logDebug('Initializing marketplace...');
    
    // 1. Create marketplace section if it doesn't exist
    let marketplaceEl = document.getElementById('marketplace-section');
    if (!marketplaceEl) {
        logDebug('Creating marketplace section...');
        marketplaceEl = document.createElement('div');
        marketplaceEl.id = 'marketplace-section';
        marketplaceEl.style.border = '3px solid red';
        marketplaceEl.style.padding = '20px';
        marketplaceEl.style.margin = '20px';
        marketplaceEl.style.background = 'white';
        marketplaceEl.innerHTML = `
            <h2 style="color:red">MARKETPLACE</h2>
            <div>
                <input type="text" id="crop-input" placeholder="Crop name">
                <input type="number" id="price-input" placeholder="Price">
                <button id="post-btn">POST</button>
            </div>
            <div id="listings"></div>
        `;
        document.querySelector('main').prepend(marketplaceEl);
    }

    // 2. Add basic functionality
    document.getElementById('post-btn').addEventListener('click', () => {
        const crop = document.getElementById('crop-input').value;
        const price = document.getElementById('price-input').value;
        
        if (crop && price) {
            const listing = document.createElement('div');
            listing.textContent = `${crop} - ₹${price}`;
            document.getElementById('listings').appendChild(listing);
            logDebug(`Added listing: ${crop} at ₹${price}`);
        }
    });

    logDebug('Marketplace ready!');
}

// Initialize when page loads
window.addEventListener('load', initMarketplace);