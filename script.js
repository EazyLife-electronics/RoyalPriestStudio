// Load Data from your JSON
async function initSite() {
    try {
        const response = await fetch('royal_priest_studio.json');
        const data = await response.json();
        renderCards(data.service_categories);
    } catch (err) {
        console.error("Error loading JSON data", err);
    }
}

function renderCards(categories) {
    const grid = document.getElementById('package-grid');
    grid.innerHTML = ''; // Clear grid

    categories.forEach(cat => {
        cat.packages.forEach(pkg => {
            const commitment = (pkg.price * 0.2).toLocaleString();
            const card = document.createElement('div');
            card.className = `card ${cat.slug}`;
            card.innerHTML = `
                <h3>${pkg.name}</h3>
                <div class="price-box">₦${pkg.price.toLocaleString()}</div>
                <p class="deposit">Commitment Fee (20%): ₦${commitment}</p>
                <ul>
                    ${pkg.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
                <button class="book-btn" onclick="openBooking('${pkg.name}')">Request Quote</button>
            `;
            grid.appendChild(card);
        });
    });
}

// Filtering Logic
function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Booking Modal Logic
function openBooking(packageName) {
    document.getElementById('selected-package').value = packageName;
    document.getElementById('booking-modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

function checkTravelFee() {
    const loc = document.getElementById('location-select').value;
    const note = document.getElementById('travel-note');
    note.style.display = (loc === 'Outside') ? 'block' : 'none';
}

// Initialize
initSite();
