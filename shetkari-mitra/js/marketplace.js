console.log('MARKETPLACE DEBUG: Script loading started');
document.addEventListener('DOMContentLoaded', () => {
    console.log('MARKETPLACE DEBUG: DOM fully loaded');
    console.log('Checking for marketplace section...');
    const marketplaceEl = document.getElementById('marketplace-section');
    console.log('Marketplace element:', marketplaceEl);
    
    if (!marketplaceEl) {
        console.error('MARKETPLACE ERROR: #marketplace-section not found in DOM');
        console.log('Current DOM structure:', document.body.innerHTML);
        return;
    }
    
    console.log('Marketplace section found, initializing...');

class Marketplace {
    constructor() {
        this.listings = [];
        this.init();
    }

    init() {
        console.log('Initializing marketplace...');
        
        // Verify required elements exist
        const marketplaceEl = document.getElementById('marketplace-section');
        const postButton = document.querySelector('.post-listing');
        
        if (!marketplaceEl || !postButton) {
            console.error('Required marketplace elements not found');
            if (!marketplaceEl) {
                console.error('Missing #marketplace-section element');
                const errorDiv = document.createElement('div');
                errorDiv.innerHTML = `
                    <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                        <p class="font-bold">Marketplace Error</p>
                        <p>Marketplace section is not properly loaded. Please refresh the page.</p>
                    </div>
                `;
                document.querySelector('main').prepend(errorDiv);
            }
            return;
        }

        // Make marketplace visible
        marketplaceEl.style.display = 'block';
        marketplaceEl.style.opacity = 1;
        
        // Initialize functionality
        postButton.addEventListener('click', () => this.createListing());
        this.loadListings();
        
        console.log('Marketplace initialized successfully');
    }

    createListing() {
        const cropType = document.querySelector('.crop-type').value;
        const quantity = document.querySelector('.crop-quantity').value;
        const price = document.querySelector('.crop-price').value;

        if (!cropType || !quantity || !price) {
            alert('Please fill all fields');
            return;
        }

        const listing = {
            id: Date.now(),
            crop: cropType,
            quantity: quantity,
            price: price,
            date: new Date().toLocaleDateString(),
            status: 'Active'
        };

        this.listings.push(listing);
        this.saveListings();
        this.displayListings();
        this.clearForm();
    }

    saveListings() {
        localStorage.setItem('marketplaceListings', JSON.stringify(this.listings));
    }

    loadListings() {
        const saved = localStorage.getItem('marketplaceListings');
        if (saved) {
            this.listings = JSON.parse(saved);
            this.displayListings();
        }
    }

    displayListings() {
        const container = document.querySelector('.listing-container');
        if (!container) return;
        
        container.innerHTML = '';

        if (this.listings.length === 0) {
            container.innerHTML = '<p class="text-gray-500 text-sm">No active listings</p>';
            return;
        }

        this.listings.forEach(listing => {
            const listingEl = document.createElement('div');
            listingEl.className = 'p-3 bg-gray-50 rounded-lg';
            listingEl.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <p class="font-medium capitalize">${listing.crop}</p>
                        <p class="text-sm">${listing.quantity} kg at ₹${listing.price}/kg</p>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-gray-500">${listing.date}</p>
                        <span class="text-xs px-2 py-1 rounded ${listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}">${listing.status}</span>
                    </div>
                </div>
                <button class="remove-listing mt-2 text-red-600 text-xs" data-id="${listing.id}">
                    <i class="fas fa-times mr-1"></i>Remove
                </button>
            `;
            container.appendChild(listingEl);
        });

        document.querySelectorAll('.remove-listing').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.closest('button').dataset.id);
                this.removeListing(id);
            });
        });

        document.querySelector('.marketplace-listings')?.classList.remove('hidden');
    }

    removeListing(id) {
        this.listings = this.listings.filter(listing => listing.id !== id);
        this.saveListings();
        this.displayListings();
    }

    clearForm() {
        document.querySelector('.crop-type').value = '';
        document.querySelector('.crop-quantity').value = '';
        document.querySelector('.crop-price').value = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - checking for marketplace');
    const marketplaceElement = document.querySelector('.post-listing');
    if (marketplaceElement) {
        console.log('Marketplace element found, initializing...');
        window.marketplace = new Marketplace();
    } else {
        console.log('Marketplace element not found');
    }
});
