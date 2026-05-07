// URL of your JSON file
const DATA_URL = 'royal_priest_studio.json';

// Initialize the site
document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

async function fetchData() {
    try {
        const response = await fetch(DATA_URL);
        const data = await response.json();
        renderPackages(data.service_categories);
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

function renderPackages(categories) {
    const grid = document.getElementById('package-grid');
    grid.innerHTML = ''; // Clear current view

    categories.forEach(category => {
        category.packages.forEach(pkg => {
            const card = document.createElement('div');
            card.className = `card ${category.slug}`;
            
            // Format pricing
            const formattedPrice = pkg.price.toLocaleString();
            const deposit = (pkg.price * 0.2).toLocaleString();

            card.innerHTML = `
                <div class="card-img" style="background-image: url('${pkg.image}')"></div>
                <div class="card-content">
                    <h3>${pkg.name}</h3>
                    <div class="price-tag">₦${formattedPrice}</div>
                    <p class="deposit-info">Initial Commitment (20%): ₦${deposit}</p>
                    <ul>
                        ${pkg.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                    <button class="book-btn" onclick="openBooking('${pkg.name}')">Secure Date</button>
                </div>
            `;
            grid.appendChild(card);
        });
    });
}

// Simple Filtering Logic
function filterSelection(slug) {
    const cards = document.querySelectorAll('.card');
    
    // Update button states
    const btns = document.querySelectorAll('.filter-nav button');
    btns.forEach(btn => btn.classList.remove('active'));

    cards.forEach(card => {
        if (slug === 'all') {
            card.style.display = 'block';
        } else {
            card.style.display = card.classList.contains(slug) ? 'block' : 'none';
        }
    });
}

// Modal & Formspree Logic
function openBooking(packageName) {
    document.getElementById('booking-modal').style.display = 'block';
    document.getElementById('package-input').value = packageName;
}

function closeModal() {
    document.getElementById('booking-modal').style.display = 'none';
}

// Close modal if user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('booking-modal');
    if (event.target == modal) {
        closeModal();
    }
}
