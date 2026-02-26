const routes = {
  '#/': { name: 'Home', title: 'Discover local businesses' },
  '#/my-business': { name: 'MyBusiness', title: 'My Dashboard' },
  '#/wishlist': { name: 'Wishlist', title: 'My Wishlist' },
  '#/cart': { name: 'Cart', title: 'Your Cart' },
  '#/add-business': { name: 'AddBusiness', title: 'Add Business' },
  '#/orders': { name: 'Orders', title: 'My Orders' },
  '#/business-profile': { name: 'BusinessProfile', title: 'Business Profile' },
};

const state = {
  mobileOpen: false,
  menuOpen: false,
};

function getUser() {
  const raw = localStorage.getItem('demoUser');
  return raw ? JSON.parse(raw) : null;
}

function setUser(user) {
  if (user) localStorage.setItem('demoUser', JSON.stringify(user));
  else localStorage.removeItem('demoUser');
}

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  return cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
}

function updateAuthUI() {
  const user = getUser();
  const authOnly = document.querySelectorAll('.auth-only');
  const loginBtn = document.getElementById('loginBtn');
  const avatarBtn = document.getElementById('avatarBtn');

  authOnly.forEach((el) => el.classList.toggle('hidden', !user));
  loginBtn.classList.toggle('hidden', !!user);
  avatarBtn.textContent = (user?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase();
}

function updateCartUI() {
  const count = getCartCount();
  const badge = document.getElementById('cartBadge');
  badge.textContent = String(count);
  badge.classList.toggle('hidden', count <= 0);
}

function renderPage() {
  const route = routes[location.hash] || routes['#/'];
  const content = document.getElementById('content');
  const app = document.getElementById('app');

  app.querySelectorAll('[data-route]').forEach((a) => {
    a.classList.toggle('active', a.dataset.route === route.name);
  });

  if (route.name === 'BusinessProfile') {
    document.querySelector('.header').classList.add('hidden');
    document.querySelector('.footer').classList.add('hidden');
  } else {
    document.querySelector('.header').classList.remove('hidden');
    document.querySelector('.footer').classList.remove('hidden');
  }

  content.innerHTML = `
    <section class="card">
      <h1>${route.title}</h1>
      <p>This is a usable, self-contained demo app with routing, auth simulation, and cart badge behavior.</p>
      <p><strong>Current route:</strong> ${location.hash || '#/'}</p>
      <button id="demoCart" class="outline-btn">Add item to cart</button>
      <button id="demoClearCart" class="outline-btn">Clear cart</button>
    </section>
  `;

  document.getElementById('demoCart').onclick = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (!cart.length) cart.push({ id: 1, name: 'Sample Item', quantity: 1 });
    else cart[0].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  };
  document.getElementById('demoClearCart').onclick = () => {
    localStorage.setItem('cart', '[]');
    updateCartUI();
  };

  state.mobileOpen = false;
  document.getElementById('mobileMenu').classList.add('hidden');
}

function wireEvents() {
  document.getElementById('mobileToggle').onclick = () => {
    state.mobileOpen = !state.mobileOpen;
    document.getElementById('mobileMenu').classList.toggle('hidden', !state.mobileOpen);
  };

  document.getElementById('avatarBtn').onclick = () => {
    state.menuOpen = !state.menuOpen;
    document.getElementById('userMenu').classList.toggle('hidden', !state.menuOpen);
  };

  document.getElementById('loginBtn').onclick = () => {
    setUser({ full_name: 'Demo User', email: 'demo@locallove.test' });
    updateAuthUI();
  };

  document.getElementById('logoutBtn').onclick = () => {
    setUser(null);
    state.menuOpen = false;
    document.getElementById('userMenu').classList.add('hidden');
    updateAuthUI();
  };

  document.getElementById('cartBtn').onclick = () => {
    location.hash = '#/cart';
  };
  document.getElementById('wishlistBtn').onclick = () => {
    location.hash = '#/wishlist';
  };

  addEventListener('hashchange', renderPage);
  addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu-wrap')) {
      state.menuOpen = false;
      document.getElementById('userMenu').classList.add('hidden');
    }
  });
}

function init() {
  if (!location.hash) location.hash = '#/';
  wireEvents();
  updateAuthUI();
  updateCartUI();
  renderPage();
}

init();
