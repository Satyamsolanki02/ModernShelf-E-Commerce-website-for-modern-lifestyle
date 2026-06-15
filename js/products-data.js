// products-data.js
// All product data stored here for consistency across all pages

const products = [
  { id: 1, name: "Minimalist Desk Lamp", price: 49, priceText: "$49", image: "https://picsum.photos/id/26/400/400", alt: "Modern desk lamp", category: "lighting" },
  { id: 2, name: "Ergonomic Mesh Chair", price: 199, priceText: "$199", image: "https://picsum.photos/id/20/400/400", alt: "Ergonomic office chair", category: "furniture" },
  { id: 3, name: "Ceramic Coffee Set", price: 89, priceText: "$89", image: "https://picsum.photos/id/30/400/400", alt: "Ceramic coffee set", category: "decor" },
  { id: 4, name: "Smart Speaker", price: 129, priceText: "$129", image: "https://picsum.photos/id/1/400/400", alt: "Smart speaker", category: "electronics" },
  { id: 5, name: "Leather Notebook", price: 24, priceText: "$24", image: "https://picsum.photos/id/0/400/400", alt: "Luxury notebook", category: "decor" },
  { id: 6, name: "Potted Plant", price: 35, priceText: "$35", image: "https://picsum.photos/id/127/400/400", alt: "Indoor plant decor", category: "decor" },
  { id: 7, name: "Wireless Charger", price: 39, priceText: "$39", image: "https://picsum.photos/id/96/400/400", alt: "Fast wireless charger", category: "electronics" },
  { id: 8, name: "Floating Shelves", price: 79, priceText: "$79", image: "https://picsum.photos/id/58/400/400", alt: "Wall shelves set", category: "furniture" },
  { id: 9, name: "LED Smart Bulb", price: 29, priceText: "$29", image: "https://picsum.photos/id/13/400/400", alt: "Smart LED bulb", category: "lighting" },
  { id: 10, name: "Modern Wall Clock", price: 59, priceText: "$59", image: "https://picsum.photos/id/43/400/400", alt: "Wall clock", category: "decor" }
];

// Function to display products in a grid
function displayProducts(productsArray, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  if (!productsArray || productsArray.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:3rem;">No products found.</div>';
    return;
  }
  
  container.innerHTML = '';
  
  productsArray.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img class="product-img" src="${product.image}" alt="${product.alt}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${product.priceText}</div>
        <button class="add-to-cart" data-name="${product.name}" data-price="${product.priceText}">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Add event listeners to all Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-name');
      showToastMessage(`✨ ${name} added to cart`);
    });
  });
}

// Display featured products (for homepage)
function displayFeaturedProducts(productsArray) {
  displayProducts(productsArray, 'featuredGrid');
}

// Display all products (for shop page)
function displayAllProducts(productsArray) {
  displayProducts(productsArray, 'productsGrid');
}

// Toast message function
function showToastMessage(msg) {
  let toast = document.querySelector('.performance-toast');
  if (!toast) {
    toast = document.getElementById('toast');
  }
  if (toast) {
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
      toast.style.opacity = '0';
    }, 2000);
  }
}

// Setup filters for shop page
function setupFilters() {
  const categoryFilter = document.getElementById('categoryFilter');
  const sortFilter = document.getElementById('sortFilter');
  
  if (!categoryFilter || !sortFilter) return;
  
  function filterAndSortProducts() {
    let filtered = [...products];
    const category = categoryFilter.value;
    const sort = sortFilter.value;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }
    
    // Sort products
    if (sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    displayAllProducts(filtered);
  }
  
  categoryFilter.addEventListener('change', filterAndSortProducts);
  sortFilter.addEventListener('change', filterAndSortProducts);
}