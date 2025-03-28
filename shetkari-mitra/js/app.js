class ShetkariMitra {
    constructor() {
        this.currentUser = null;
        this.currentLanguage = 'en';
        this.init();
    }

    init() {
        console.log('Initializing application...');
        this.initLanguage();
        this.checkAuth();
    }

    checkAuth() {
        const user = localStorage.getItem('currentUser');
        console.log('Auth check - stored user:', user);
        
        if (user) {
            this.currentUser = JSON.parse(user);
            this.showDashboard();
        } else {
            this.showAuth();
        }
    }

    showAuth() {
        console.log('Showing auth screen');
        document.getElementById('app').innerHTML = `
            <div class="auth-container">
                <h1 class="auth-title">Shetkari Mitra Login</h1>
                <form id="loginForm" class="space-y-4">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" id="loginEmail" class="form-input" 
                               placeholder="farmer@example.com" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="loginPassword" class="form-input" 
                               placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn-primary w-full">Login</button>
                </form>
                <div class="mt-4 text-center">
                    <p class="text-gray-600">Don't have an account? 
                        <a href="#" id="showSignup" class="text-green-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        `;
        this.setupAuthEvents();
    }

    showDashboard() {
        console.log('Showing dashboard for:', this.currentUser);
        document.getElementById('app').innerHTML = `
            <div class="min-h-screen bg-gray-100">
                <header class="bg-white shadow-sm">
                    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 class="text-2xl font-bold text-green-700">Shetkari Mitra</h1>
                        <div class="flex items-center space-x-4">
                            <span class="text-gray-700">${this.currentUser.name}</span>
                            <button id="logoutBtn" class="text-red-600 hover:text-red-800">
                                <i class="fas fa-sign-out-alt mr-1"></i> Logout
                            </button>
                        </div>
                    </div>
                </header>
                <main class="max-w-7xl mx-auto px-4 py-6">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <!-- Weather Card -->
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold mb-3 flex items-center">
                                <i class="fas fa-cloud-sun text-blue-500 mr-2"></i>
                                Weather Forecast
                            </h3>
                            <div class="space-y-2">
                                <p><i class="fas fa-temperature-high text-red-500 mr-2"></i> 
                                    Temperature: <span class="weather-temp">28°C</span>
                                </p>
                                <p><i class="fas fa-tint text-blue-400 mr-2"></i> 
                                    Humidity: <span class="weather-humidity">65%</span>
                                </p>
                                <p><i class="fas fa-wind text-gray-400 mr-2"></i> 
                                    Wind: <span class="weather-wind">12 km/h NE</span>
                                </p>
                                <p><i class="fas fa-cloud text-gray-500 mr-2"></i>
                                    Forecast: <span class="weather-forecast">Partly cloudy</span>
                                </p>
                            </div>
                            <button class="weather-refresh mt-2 text-sm text-blue-600 hover:underline">
                                <i class="fas fa-sync-alt mr-1"></i> Refresh
                            </button>
                        </div>

                        <!-- Crop Advisory -->
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold mb-3 flex items-center justify-between">
                                <span><i class="fas fa-seedling text-green-500 mr-2"></i>Crop Advisory</span>
                                <button class="advisory-toggle text-blue-600 text-sm">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </h3>
                            <p>Current season: <span class="font-medium">Kharif</span></p>
                            <div class="full-advisory hidden mt-3 space-y-3">
                                <div class="p-3 bg-green-50 rounded-lg">
                                    <h4 class="font-medium mb-1">Rice Cultivation (Kharif Season)</h4>
                                    <p class="text-sm"><span class="font-medium">Best Varieties:</span> IR64, Swarna, Samba Mahsuri, BPT-5204</p>
                                    <p class="text-sm"><span class="font-medium">Sowing Period:</span> June-July (Transplanting July-Aug)</p>
                                    <p class="text-sm"><span class="font-medium">Water Management:</span> Maintain 5cm water depth</p>
                                    <p class="text-sm"><span class="font-medium">Key Pests:</span> Stem borer, Brown plant hopper</p>
                                    <button class="view-more text-blue-600 text-xs mt-1">View Detailed Advisory →</button>
                                </div>
                                <div class="p-3 bg-yellow-50 rounded-lg">
                                    <h4 class="font-medium mb-1">Maize Cultivation</h4>
                                    <p class="text-sm"><span class="font-medium">Hybrid Varieties:</span> HQPM-1, Pusa Hybrid-4</p>
                                    <p class="text-sm"><span class="font-medium">Fertilizer:</span> 120kg N, 60kg P, 40kg K per hectare</p>
                                    <p class="text-sm"><span class="font-medium">Spacing:</span> 60cm between rows, 20cm between plants</p>
                                    <p class="text-sm"><span class="font-medium">Key Threats:</span> Fall Armyworm, Stem borers</p>
                                    <button class="view-more text-blue-600 text-xs mt-1">View Detailed Advisory →</button>
                                </div>
                                <div class="p-3 bg-blue-50 rounded-lg">
                                    <h4 class="font-medium mb-1">Cotton Farming</h4>
                                    <p class="text-sm"><span class="font-medium">Recommended:</span> Bt Cotton varieties</p>
                                    <p class="text-sm"><span class="font-medium">Spacing:</span> 90cm between rows, 45cm between plants</p>
                                    <p class="text-sm"><span class="font-medium">Pest Control:</span> Neem oil spray weekly, monitor for bollworms</p>
                                    <p class="text-sm"><span class="font-medium">Harvest:</span> 150-180 days after sowing</p>
                                    <button class="view-more text-blue-600 text-xs mt-1">View Detailed Advisory →</button>
                                </div>
                                <div class="p-3 bg-purple-50 rounded-lg">
                                    <h4 class="font-medium mb-1">Soybean Farming</h4>
                                    <p class="text-sm"><span class="font-medium">Varieties:</span> JS-335, MACS-1407</p>
                                    <p class="text-sm"><span class="font-medium">Sowing:</span> June-July with onset of monsoon</p>
                                    <p class="text-sm"><span class="font-medium">Key Practices:</span> Rhizobium seed treatment</p>
                                    <p class="text-sm"><span class="font-medium">Pests:</span> Stem fly, Leaf miner</p>
                                    <button class="view-more text-blue-600 text-xs mt-1">View Detailed Advisory →</button>
                                </div>
                            </div>
                        </div>

                        <!-- Market Prices -->
                        <div class="bg-white p-6 rounded-lg shadow">
                            <h3 class="text-lg font-semibold mb-3 flex items-center justify-between">
                                <span><i class="fas fa-rupee-sign text-yellow-500 mr-2"></i>Market Prices</span>
                                <div class="relative">
                                    <input type="text" placeholder="Search crops..." 
                                           class="price-search text-sm border rounded pl-8 pr-2 py-1 w-40">
                                    <i class="fas fa-search absolute left-2 top-2 text-gray-400"></i>
                                </div>
                            </h3>
                            <div class="overflow-x-auto">
                                <table class="min-w-full">
                                    <thead>
                                        <tr class="bg-gray-100 text-left text-sm">
                                            <th class="p-2">Crop</th>
                                            <th class="p-2">Price (₹/quintal)</th>
                                            <th class="p-2">Market</th>
                                        </tr>
                                    </thead>
                                    <tbody class="price-data">
                                        <tr>
                                            <td class="p-2 border-b">Rice (Basmati)</td>
                                            <td class="p-2 border-b price-value">1,850-2,200</td>
                                            <td class="p-2 border-b">Mumbai APMC</td>
                                        </tr>
                                        <tr>
                                            <td class="p-2 border-b">Wheat (Sharbati)</td>
                                            <td class="p-2 border-b price-value">2,015-2,350</td>
                                            <td class="p-2 border-b">Delhi Mandi</td>
                                        </tr>
                                        <tr>
                                            <td class="p-2 border-b">Cotton (Long Staple)</td>
                                            <td class="p-2 border-b price-value">6,200-7,100</td>
                                            <td class="p-2 border-b">Ahmedabad Market</td>
                                        </tr>
                                        <tr>
                                            <td class="p-2 border-b">Soybean (Black)</td>
                                            <td class="p-2 border-b price-value">3,800-4,250</td>
                                            <td class="p-2 border-b">Indore Market</td>
                                        </tr>
                                        <tr>
                                            <td class="p-2 border-b">Turmeric (Polished)</td>
                                            <td class="p-2 border-b price-value">8,500-9,200</td>
                                            <td class="p-2 border-b">Erode Market</td>
                                        </tr>
                                        <tr>
                                            <td class="p-2 border-b">Maize (Hybrid)</td>
                                            <td class="p-2 border-b price-value">1,950-2,300</td>
                                            <td class="p-2 border-b">Nizamabad Market</td>
                                        </tr>
                                    </tbody>
                                    <div class="p-2 text-right">
                                        <button class="refresh-prices text-blue-600 text-sm hover:underline">
                                            <i class="fas fa-sync-alt mr-1"></i> Refresh Prices
                                        </button>
                                    </div>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Main Content Sections -->
                    <div class="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 class="text-xl font-bold mb-4">Welcome, ${this.currentUser.name}!</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Crop Disease Detection -->
                            <div>
                                <h3 class="text-lg font-semibold mb-3">Crop Disease Detection</h3>
                                <div class="border border-dashed border-gray-300 rounded-lg p-4 text-center">
                                    <i class="fas fa-camera text-4xl text-gray-400 mb-2"></i>
                                    <p>Upload image of affected crop</p>
                                    <button class="mt-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg">
                                        Detect Disease
                                    </button>
                                </div>
                            </div>

                            <!-- Government Schemes -->
                            <div>
                                <h3 class="text-lg font-semibold mb-3 flex items-center justify-between">
                                    <span>Government Schemes</span>
                                    <div class="relative">
                                        <input type="text" placeholder="Search schemes..." 
                                               class="scheme-search text-sm border rounded pl-8 pr-2 py-1 w-48">
                                        <i class="fas fa-search absolute left-2 top-2 text-gray-400"></i>
                                    </div>
                                </h3>
                                <div class="scheme-list space-y-2">
                                    <div class="scheme-item p-3 bg-gray-50 rounded-lg">
                                        <h4 class="font-medium flex items-center">
                                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                            PM Kisan Samman Nidhi
                                        </h4>
                                        <p class="text-sm mt-1">₹6,000/year in 3 installments</p>
                                        <p class="text-xs text-gray-500 mt-1">Eligibility: All landholding farmers</p>
                                        <a href="#" class="text-blue-600 text-xs mt-1 inline-block">Apply Online →</a>
                                    </div>
                                    <div class="scheme-item p-3 bg-gray-50 rounded-lg">
                                        <h4 class="font-medium flex items-center">
                                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                            Soil Health Card Scheme
                                        </h4>
                                        <p class="text-sm mt-1">Free soil testing + recommendations</p>
                                        <p class="text-xs text-gray-500 mt-1">Covers: 12 parameters</p>
                                        <a href="#" class="text-blue-600 text-xs mt-1 inline-block">Find Testing Center →</a>
                                    </div>
                                    <div class="scheme-item p-3 bg-gray-50 rounded-lg">
                                        <h4 class="font-medium flex items-center">
                                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                            PM Fasal Bima Yojana
                                        </h4>
                                        <p class="text-sm mt-1">Subsidized crop insurance</p>
                                        <p class="text-xs text-gray-500 mt-1">Premium: 1.5-5% of sum insured</p>
                                        <a href="#" class="text-blue-600 text-xs mt-1 inline-block">Enroll Now →</a>
                                    </div>
                                    <div class="scheme-item p-3 bg-gray-50 rounded-lg">
                                        <h4 class="font-medium flex items-center">
                                            <i class="fas fa-check-circle text-green-500 mr-2"></i>
                                            Kisan Credit Card
                                        </h4>
                                        <p class="text-sm mt-1">Up to ₹3 lakh at 4% interest</p>
                                        <p class="text-xs text-gray-500 mt-1">Collateral-free loans</p>
                                        <a href="#" class="text-blue-600 text-xs mt-1 inline-block">Apply at Bank →</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        `;
        document.getElementById('logoutBtn').addEventListener('click', () => this.logout());
        
        // Add dashboard interactivity
        this.initDashboardFeatures();
    }

    initDashboardFeatures() {
        // Weather refresh
        document.querySelector('.weather-refresh').addEventListener('click', () => {
            this.fetchWeatherData();
        });

        // Crop advisory expand
        document.querySelectorAll('.advisory-toggle').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.full-advisory').classList.toggle('hidden');
            });
        });

        // Disease detection
        document.querySelector('.disease-upload').addEventListener('click', () => {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*';
            fileInput.onchange = (e) => this.analyzeCropImage(e.target.files[0]);
            fileInput.click();
        });

        // Initialize with sample data
        this.fetchWeatherData();
    }

    fetchWeatherData() {
        // Simulate API call with random variations
        const forecasts = ['Sunny', 'Partly cloudy', 'Cloudy', 'Light rain', 'Thunderstorms'];
        const windDirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        
        const weatherData = {
            temp: `${Math.floor(25 + Math.random() * 8)}°C`,
            humidity: `${Math.floor(50 + Math.random() * 30)}%`,
            wind: `${Math.floor(5 + Math.random() * 15)} km/h ${windDirs[Math.floor(Math.random()*windDirs.length)]}`,
            forecast: forecasts[Math.floor(Math.random()*forecasts.length)]
        };
        
        document.querySelector('.weather-temp').textContent = weatherData.temp;
        document.querySelector('.weather-humidity').textContent = weatherData.humidity;
        document.querySelector('.weather-wind').textContent = weatherData.wind;
        document.querySelector('.weather-forecast').textContent = weatherData.forecast;
        
        this.showAlert('Weather data updated', 'success');
    }

    analyzeCropImage(file) {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Show preview
                document.querySelector('.disease-preview').innerHTML = `
                    <img src="${e.target.result}" class="max-w-full mb-2 rounded">
                    <div class="text-center">
                        <div class="spinner-border text-green-500 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                            <span class="visually-hidden">Analyzing...</span>
                        </div>
                        <p>Analyzing image...</p>
                    </div>
                `;
                
                // Simulate analysis
                setTimeout(() => {
                    const results = [
                        {name: 'Leaf Rust', confidence: '87%', treatment: 'Apply fungicide X every 7 days'},
                        {name: 'Powdery Mildew', confidence: '63%', treatment: 'Use neem oil spray'}
                    ];
                    
                    this.showDiseaseResults(results);
                }, 2000);
            };
            reader.readAsDataURL(file);
        }
    }

    showDiseaseResults(results) {
        let html = '<h4 class="font-bold mb-2">Detection Results:</h4>';
        results.forEach(result => {
            html += `
                <div class="mb-3 p-3 bg-gray-50 rounded">
                    <p><span class="font-medium">${result.name}</span> (${result.confidence} confidence)</p>
                    <p class="text-sm text-gray-600">Treatment: ${result.treatment}</p>
                </div>
            `;
        });
        
        document.querySelector('.disease-preview').innerHTML = html;
        this.showAlert('Analysis complete', 'success');
    }

    setupAuthEvents() {
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        document.getElementById('showSignup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showSignup();
        });
    }

    handleLogin() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            this.showAlert('Please fill in all fields', 'error');
            return;
        }

        // Test credentials
        if (email === 'test@farmer.com' && password === 'farmer123') {
            this.currentUser = {
                id: 'test001', 
                name: 'Test Farmer',
                email: 'test@farmer.com'
            };
            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.showDashboard();
            return;
        }

        // Check registered users
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.showDashboard();
        } else {
            this.showAlert('Invalid credentials. Try test@farmer.com/farmer123', 'error');
        }
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUser = null;
        this.showAuth();
    }

    initLanguage() {
        if (!localStorage.getItem('language')) {
            localStorage.setItem('language', this.currentLanguage);
        }
    }

    showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg 
                          ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 3000);
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ShetkariMitra();
});