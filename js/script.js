// js/main.js
// Products Data
const products = [
  { id: 1, name: "Minimalist Desk Lamp", price: "$49", image: "https://picsum.photos/id/26/400/400", alt: "Modern desk lamp" },
  { id: 2, name: "Ergonomic Mesh Chair", price: "$199", image: "https://picsum.photos/id/20/400/400", alt: "Ergonomic office chair" },
  { id: 3, name: "Ceramic Coffee Set", price: "$89", image: "https://picsum.photos/id/30/400/400", alt: "Ceramic coffee set" },
  { id: 4, name: "Smart Speaker", price: "$129", image: "https://picsum.photos/id/1/400/400", alt: "Smart speaker" },
  { id: 5, name: "Leather Notebook", price: "$24", image: "https://picsum.photos/id/0/400/400", alt: "Luxury notebook" },
  { id: 6, name: "Potted Plant", price: "$35", image: "https://picsum.photos/id/127/400/400", alt: "Indoor plant decor" }
];

// Render Products Function
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-wrapper">
        <img class="product-img" src="${product.image}" alt="${product.alt}" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">${product.price}</div>
        <button class="add-to-cart" data-name="${product.name}"><i class="fas fa-shopping-cart"></i> Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
  });

  // Add event listeners to all Add to Cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const name = btn.getAttribute('data-name');
      showToast(`✨ ${name} added to cart`);
    });
  });
}

// Toast Notification
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 2000);
}

// Mobile Menu Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');
  if (!toggleBtn || !mainNav) return;
  
  toggleBtn.addEventListener('click', () => {
    mainNav.classList.toggle('active');
    const icon = toggleBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// Active Navigation on Scroll
function initActiveNav() {
  const sections = document.querySelectorAll('section[id], .hero');
  const navLinks = document.querySelectorAll('.main-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id') || 'home';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      } else if (current === '' && href === 'home') {
        link.classList.add('active');
      }
    });
  });
}

// Newsletter Form
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const emailInput = document.getElementById('emailInput');
  const feedback = document.getElementById('formFeedback');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
    
    if (!email) {
      feedback.textContent = '📧 Please enter your email address.';
      feedback.style.color = '#ff6b35';
    } else if (!pattern.test(email)) {
      feedback.textContent = '⚠️ Please enter a valid email address.';
      feedback.style.color = '#ff6b35';
    } else {
      feedback.textContent = '✅ Thanks for subscribing!';
      feedback.style.color = '#ffb347';
      emailInput.value = '';
      setTimeout(() => {
        feedback.textContent = '';
      }, 3000);
    }
  });
}

// Custom Cursor
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  if (!cursor) return;
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
  });
  
  document.querySelectorAll('a, button, .product-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'scale(2)';
      cursor.style.background = '#ffb347';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'scale(1)';
      cursor.style.background = '#ff6b35';
    });
  });
}

// Particles Animation
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 3 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
    container.appendChild(particle);
  }
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close mobile menu if open
        const mainNav = document.getElementById('mainNav');
        const toggleBtn = document.getElementById('mobileMenuToggle');
        if (mainNav && mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  });
}

// Initialize Everything when DOM is Ready
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initMobileMenu();
  initHeaderScroll();
  initActiveNav();
  initNewsletter();
  initCustomCursor();
  createParticles();
  initSmoothScroll();
  
  console.log('ModernShelf - Premium Experience Loaded ✓');
});