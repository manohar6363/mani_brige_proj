// DOM Elements
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const dropdown = document.getElementById('dropdown');
const bridgeList = document.getElementById('bridgeList');
const bridgeItems = bridgeList.querySelectorAll('li');

// Bridge data object with image properties
const bridgeData = {
    "Howrah Bridge": {
        location: "Kolkata, West Bengal",
        year: "1943",
        engineer: "Rendel Palmer & Tritton",
        constructionTime: "8 years",
        type: "Cantilever Bridge",
        loadCapacity: "Heavy vehicular & pedestrian traffic",
        life: "100+ years",
        image: "images/howrah.jpg"
    },
    "Bandra-Worli Sea Link": {
        location: "Mumbai, Maharashtra",
        year: "2009",
        engineer: "S. B. Billimoria",
        constructionTime: "5 years",
        type: "Cable-Stayed Bridge",
        loadCapacity: "High-speed vehicular traffic",
        life: "100 years",
        image: "images/bandra.jpg"
    },
    "Pamban Bridge": {
        location: "Tamil Nadu",
        year: "1914",
        engineer: "Scherzer Rolling Lift Bridge Company",
        constructionTime: "4 years",
        type: "Cantilever Railway Bridge",
        loadCapacity: "Railway traffic",
        life: "100 years",
        image: "images/pamban.jpg"
    },
    "Krishna Raja Sagar Dam": {
        location: "Karnataka",
        year: "1931",
        engineer: "Sir M. Visvesvaraya",
        constructionTime: "11 years",
        type: "Gravity Dam",
        loadCapacity: "Major irrigation & water storage",
        life: "100+ years",
        image: "images/krs.jpg"
    },
    "Vidyasagar Setu": {
        location: "Kolkata, West Bengal",
        year: "1992",
        engineer: "S. K. Chatterjee",
        constructionTime: "12 years",
        type: "Cable-Stayed Bridge",
        loadCapacity: "Heavy vehicular traffic",
        life: "100 years",
        image: "images/vidyasagar.jpg"
    },
    "Bhupen Hazarika Setu": {
        location: "Assam",
        year: "2017",
        engineer: "National Highways Authority of India (NHAI)",
        constructionTime: "6 years",
        type: "Beam Bridge",
        loadCapacity: "Military & heavy vehicles",
        life: "100+ years",
        image: "images/bhupen.jpg"
    },
    "Rohini Setu": {
        location: "Bihar",
        year: "1979",
        engineer: "Bihar State Bridge Construction Corporation",
        constructionTime: "5 years",
        type: "River Bridge",
        loadCapacity: "Road traffic",
        life: "80-100 years",
        image: "images/rohini.jpg"
    },
    "Mahatma Gandhi Setu": {
        location: "Patna, Bihar",
        year: "1982",
        engineer: "Gammon India Ltd",
        constructionTime: "10 years",
        type: "Prestressed Concrete Bridge",
        loadCapacity: "Heavy road traffic",
        life: "100 years",
        image: "images/mgsetu.jpg"
    },
    "Godavari Arch Bridge": {
        location: "Rajahmundry, Andhra Pradesh",
        year: "2016",
        engineer: "Indian Railways",
        constructionTime: "5 years",
        type: "Bowstring Arch Railway Bridge",
        loadCapacity: "Railway traffic",
        life: "100+ years",
        image: "images/godavari.jpg"
    },
    "Vembanad Rail Bridge": {
        location: "Kerala",
        year: "2011",
        engineer: "Indian Railways",
        constructionTime: "3 years",
        type: "Rail Bridge",
        loadCapacity: "Railway traffic",
        life: "100 years",
        image: "images/vembanad.jpg"
    },
    "Bogibeel Bridge": {
        location: "Assam",
        year: "2018",
        engineer: "Indian Railways",
        constructionTime: "16 years",
        type: "Combined Road & Rail Bridge",
        loadCapacity: "Road and railway traffic",
        life: "120 years",
        image: "images/bogibeel.jpg"
    }
};

// Calculation configuration based on bridge type
const calculationConfig = {
    road: {
        name: "Road Bridge",
        DL: 20,      // Dead Load (kN/m)
        LL: 30,      // Live Load (kN/m) - vehicular
        L: 100       // Span length (m)
    },
    railway: {
        name: "Railway Bridge",
        DL: 30,      // Dead Load (kN/m)
        LL: 70,      // Live Load (kN/m) - railway load
        L: 100       // Span length (m)
    },
    combined: {
        name: "Road + Rail Bridge",
        DL: 35,      // Dead Load (kN/m)
        LL: 90,      // Live Load (kN/m) - combined higher load
        L: 100       // Span length (m)
    }
};

// Bridge category mapping
const bridgeCategories = {
    "Howrah Bridge": "road",
    "Bandra-Worli Sea Link": "road",
    "Pamban Bridge": "railway",
    "Krishna Raja Sagar Dam": "road",
    "Vidyasagar Setu": "road",
    "Bhupen Hazarika Setu": "road",
    "Rohini Setu": "road",
    "Mahatma Gandhi Setu": "road",
    "Godavari Arch Bridge": "railway",
    "Vembanad Rail Bridge": "railway",
    "Bogibeel Bridge": "combined"
};

// Helper function to get bridge category
function getBridgeCategory(bridgeName) {
    return bridgeCategories[bridgeName] || "road";
}

// Helper function to get default values based on bridge type
function getDefaultValues(bridgeName) {
    const category = getBridgeCategory(bridgeName);
    return calculationConfig[category];
}

// Helper function to generate calculation HTML with input fields
function generateCalculationsHTML(bridgeName) {
    const defaults = getDefaultValues(bridgeName);
    
    return `
        <div class="calculations-box">
            <h4>Calculations (${defaults.name})</h4>
            <div class="calc-inputs">
                <div class="input-group">
                    <label for="spanLength">Span Length (L) m:</label>
                    <input type="number" id="spanLength" value="${defaults.L}" min="1" step="1">
                </div>
                <div class="input-group">
                    <label for="deadLoad">Dead Load (DL) kN/m:</label>
                    <input type="number" id="deadLoad" value="${defaults.DL}" min="1" step="1">
                </div>
                <div class="input-group">
                    <label for="liveLoad">Live Load (LL) kN/m:</label>
                    <input type="number" id="liveLoad" value="${defaults.LL}" min="1" step="1">
                </div>
            </div>
            <button id="calculateBtn" class="calculate-btn">Calculate</button>
            <div id="calcResults" class="calc-results" style="display: none;">
                <div class="result-item">
                    <span class="result-label">Total Load per meter:</span>
                    <span id="totalLoadPerMeter" class="result-value">-- kN/m</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Load:</span>
                    <span id="totalLoad" class="result-value">-- kN</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Bending Moment:</span>
                    <span id="bendingMoment" class="result-value">-- kN·m</span>
                </div>
            </div>
            <div class="calc-notes">
                <p><em>DL = Dead Load | LL = Live Load | w = Total Load per meter | L = Span Length</em></p>
            </div>
        </div>
    `;
}

// Function to perform calculations
function performCalculation() {
    const spanLength = parseFloat(document.getElementById('spanLength').value) || 0;
    const deadLoad = parseFloat(document.getElementById('deadLoad').value) || 0;
    const liveLoad = parseFloat(document.getElementById('liveLoad').value) || 0;
    
    const totalLoadPerMeter = deadLoad + liveLoad;
    const totalLoad = totalLoadPerMeter * spanLength;
    const bendingMoment = (totalLoadPerMeter * Math.pow(spanLength, 2)) / 8;
    
    document.getElementById('totalLoadPerMeter').textContent = totalLoadPerMeter.toFixed(2) + ' kN/m';
    document.getElementById('totalLoad').textContent = totalLoad.toFixed(2) + ' kN';
    document.getElementById('bendingMoment').textContent = bendingMoment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' kN·m';
    
    document.getElementById('calcResults').style.display = 'block';
}

// Create bridge info card container
const bridgeInfoContainer = document.createElement('div');
bridgeInfoContainer.id = 'bridgeInfoCard';
bridgeInfoContainer.style.cssText = 'margin-top: 20px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); display: none;';
document.querySelector('.search-container').appendChild(bridgeInfoContainer);

// Create bridge image element
const bridgeImage = document.createElement('img');
bridgeImage.id = 'bridgeImage';
bridgeImage.style.cssText = 'width: 100%; max-width: 100%; height: auto; border-radius: 8px; margin-bottom: 15px; display: none;';
bridgeImage.alt = 'Bridge Image';
bridgeInfoContainer.appendChild(bridgeImage);

// Function to display bridge info
function displayBridgeInfo(bridgeName) {
    const bridge = bridgeData[bridgeName];
    if (!bridge) return;
    
    // Update image if available
    if (bridge.image) {
        bridgeImage.src = bridge.image;
        bridgeImage.style.display = 'block';
    } else {
        bridgeImage.style.display = 'none';
    }
    
    // Generate calculations HTML
    const calculationsHTML = generateCalculationsHTML(bridgeName);
    
    // Create info content with two-column layout
    const infoHTML = `
        <div class="bridge-content">
            <div class="bridge-info-section">
                <h3 style="margin-bottom: 15px; color: #2c3e50; font-size: 1.3rem;">${bridgeName}</h3>
                <div style="display: grid; gap: 10px;">
                    <p><strong>Location:</strong> ${bridge.location}</p>
                    <p><strong>Year Completed:</strong> ${bridge.year}</p>
                    <p><strong>Chief Engineer:</strong> ${bridge.engineer}</p>
                    <p><strong>Construction Time:</strong> ${bridge.constructionTime}</p>
                    <p><strong>Type:</strong> ${bridge.type}</p>
                    <p><strong>Load Capacity:</strong> ${bridge.loadCapacity}</p>
                    <p><strong>Expected Life:</strong> ${bridge.life}</p>
                </div>
            </div>
            <div class="bridge-calculations-section">
                ${calculationsHTML}
            </div>
        </div>
    `;
    
    // Insert info after image
    if (bridgeInfoContainer.querySelector('h3')) {
        const oldContent = bridgeInfoContainer.querySelectorAll('.bridge-content');
        oldContent.forEach(el => el.remove());
    }
    bridgeImage.insertAdjacentHTML('afterend', infoHTML);
    
    // Add event listener for calculate button
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', performCalculation);
    }
    
    bridgeInfoContainer.style.display = 'block';
}

// Toggle dropdown on button click
searchButton.addEventListener('click', function() {
    const isHidden = dropdown.classList.contains('hidden');
    
    if (isHidden) {
        dropdown.classList.remove('hidden');
        searchInput.focus();
    } else {
        dropdown.classList.add('hidden');
    }
});

// Filter bridges based on search input
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase().trim();
    
    bridgeItems.forEach(function(item) {
        const bridgeName = item.textContent.toLowerCase();
        
        if (searchTerm === '' || bridgeName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Show dropdown when typing
    if (searchTerm !== '') {
        dropdown.classList.remove('hidden');
    }
});

// Handle bridge item click
bridgeItems.forEach(function(item) {
    item.addEventListener('click', function() {
        const bridgeName = this.getAttribute('data-bridge');
        searchInput.value = bridgeName;
        dropdown.classList.add('hidden');
        displayBridgeInfo(bridgeName);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const searchContainer = document.querySelector('.search-container');
    
    if (!searchContainer.contains(event.target)) {
        dropdown.classList.add('hidden');
    }
});

// Show dropdown on focus
searchInput.addEventListener('focus', function() {
    dropdown.classList.remove('hidden');
});

// Keyboard navigation
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        dropdown.classList.add('hidden');
        this.blur();
    }
    
    if (event.key === 'Enter') {
        const visibleItems = Array.from(bridgeItems).filter(item => item.style.display !== 'none');
        if (visibleItems.length > 0) {
            const firstVisible = visibleItems[0];
            const bridgeName = firstVisible.getAttribute('data-bridge');
            searchInput.value = bridgeName;
            dropdown.classList.add('hidden');
            displayBridgeInfo(bridgeName);
        }
    }
});

