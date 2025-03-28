class DiseaseDetection {
    constructor() {
        this.cropper = null;
        this.init();
    }

    init() {
        document.querySelector('.disease-upload').addEventListener('click', () => this.openFileDialog());
        document.querySelector('.analyze-btn').addEventListener('click', () => this.analyzeImage());
        document.querySelector('.crop-btn').addEventListener('click', () => this.cropImage());
    }

    openFileDialog() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => this.loadImage(e.target.files[0]);
        fileInput.click();
    }

    loadImage(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.querySelector('.disease-preview');
            preview.innerHTML = `
                <div class="cropper-container mb-3" style="max-height: 300px;"></div>
                <div class="flex space-x-2 justify-center">
                    <button class="crop-btn bg-green-500 text-white px-3 py-1 rounded text-sm">
                        <i class="fas fa-crop mr-1"></i>Crop Image
                    </button>
                    <button class="analyze-btn bg-blue-500 text-white px-3 py-1 rounded text-sm">
                        <i class="fas fa-search mr-1"></i>Analyze
                    </button>
                </div>
            `;
            
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            
            const container = document.querySelector('.cropper-container');
            container.appendChild(img);
            
            this.cropper = new Cropper(img, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 0.8
            });
            
            preview.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }

    cropImage() {
        if (!this.cropper) return;
        
        const croppedCanvas = this.cropper.getCroppedCanvas();
        document.querySelector('.cropper-container').innerHTML = '';
        document.querySelector('.cropper-container').appendChild(croppedCanvas);
        
        this.cropper.destroy();
        this.cropper = null;
    }

    analyzeImage() {
        const container = document.querySelector('.cropper-container');
        const img = container.querySelector('img') || container.querySelector('canvas');
        
        if (!img) return;
        
        container.innerHTML = `
            <div class="text-center py-8">
                <div class="spinner-border text-blue-500 animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span class="visually-hidden">Analyzing...</span>
                </div>
                <p class="mt-2">Analyzing crop disease...</p>
            </div>
        `;
        
        // Simulate analysis
        setTimeout(() => {
            const results = [
                {name: 'Leaf Rust', confidence: '87%', treatment: 'Apply fungicide X every 7 days'},
                {name: 'Powdery Mildew', confidence: '63%', treatment: 'Use neem oil spray'}
            ];
            
            this.showResults(results);
        }, 2000);
    }

    showResults(results) {
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
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.diseaseDetector = new DiseaseDetection();
});