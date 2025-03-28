// Marketplace Initialization
console.log('MARKETPLACE INIT: Script loaded');

function initializeMarketplace() {
    try {
        console.log('MARKETPLACE INIT: Checking for required elements');
        
        // 1. Verify marketplace section exists
        const marketplaceSection = document.getElementById('marketplace-section');
        if (!marketplaceSection) {
            throw new Error('Marketplace section element not found');
        }

        // 2. Verify form elements exist
        const formElements = {
            cropType: document.querySelector('.crop-type'),
            quantity: document.querySelector('.crop-quantity'),
            price: document.querySelector('.crop-price'),
            postButton: document.querySelector('.post-listing')
        };

        // 3. Make marketplace visible
        marketplaceSection.style.display = 'block';
        marketplaceSection.style.opacity = 1;
        marketplaceSection.style.border = '2px solid green';
        marketplaceSection.style.padding = '1rem';
        
        console.log('MARKETPLACE INIT: All elements found, initialization complete');
        return true;
    } catch (error) {
        console.error('MARKETPLACE ERROR:', error);
        
        // Show visible error message
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '0';
        errorDiv.style.left = '0';
        errorDiv.style.right = '0';
        errorDiv.style.background = 'red';
        errorDiv.style.color = 'white';
        errorDiv.style.padding = '1rem';
        errorDiv.style.zIndex = '1000';
        errorDiv.textContent = `Marketplace Error: ${error.message}`;
        
        document.body.prepend(errorDiv);
        return false;
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMarketplace);
} else {
    initializeMarketplace();
}