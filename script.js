// ===== NAVIGATION TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
}

// ===== GLOBAL PAGE LOADER + CARS MENU FOCUS =====
let pageLoaderEl = null;
let pageLoaderProgressEl = null;
let pageLoaderStatusEl = null;
let loaderIntervalId = null;

function ensurePageLoader() {
  if (pageLoaderEl) return;

  const loaderMarkup = `
    <div class="loader-panel">
      <p class="loader-tag">System Boot</p>
      <h2 class="loader-title">TEDDY MENU INTERFACE</h2>
      <p class="loader-status" id="loader-status">Loading module...</p>
      <div class="loader-track" role="presentation">
        <div class="loader-progress" id="loader-progress"></div>
      </div>
      <p class="loader-hint">Loading...</p>
    </div>
  `;

  pageLoaderEl = document.createElement('div');
  pageLoaderEl.className = 'page-loader';
  pageLoaderEl.innerHTML = loaderMarkup;
  document.body.appendChild(pageLoaderEl);

  pageLoaderProgressEl = pageLoaderEl.querySelector('#loader-progress');
  pageLoaderStatusEl = pageLoaderEl.querySelector('#loader-status');
}

function setLoaderVisibility(show) {
  ensurePageLoader();
  pageLoaderEl.classList.toggle('hidden', !show);
}

function animateLoader(statusText = 'Loading module...', doneCallback) {
  ensurePageLoader();

  const loadingSteps = [20, 43, 67, 84, 100];
  let stepIndex = 0;
  pageLoaderStatusEl.textContent = statusText;
  pageLoaderProgressEl.style.width = '0%';
  setLoaderVisibility(true);

  if (loaderIntervalId) {
    clearInterval(loaderIntervalId);
  }

  loaderIntervalId = setInterval(() => {
    if (stepIndex >= loadingSteps.length) {
      clearInterval(loaderIntervalId);
      loaderIntervalId = null;
      if (typeof doneCallback === 'function') {
        doneCallback();
      }
      return;
    }

    pageLoaderProgressEl.style.width = `${loadingSteps[stepIndex]}%`;
    stepIndex += 1;
  }, 100);
}

function initPageTransitions() {
  const moduleLabel = document.body.dataset.loaderTitle || document.title;

  animateLoader(`Loading ${moduleLabel}...`, () => {
    setTimeout(() => {
      setLoaderVisibility(false);
      document.body.classList.add('loaded');
    }, 120);
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      const isAnchor = href.startsWith('#');
      const isDownload = link.hasAttribute('download');
      const isExternal = link.target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http');
      const isSamePage = href === window.location.pathname.split('/').pop();

      if (isAnchor || isDownload || isExternal || isSamePage) {
        return;
      }

      event.preventDefault();
      animateLoader(`Loading ${link.textContent.trim()}...`, () => {
        window.location.href = href;
      });
    });
  });
}

function initCarsMenuFocus() {
  const menuOptions = document.querySelectorAll('.menu-option');
  if (!menuOptions.length) {
    return;
  }

  menuOptions.forEach((option) => {
    option.addEventListener('click', () => {
      menuOptions.forEach((item) => item.classList.remove('active'));
      option.classList.add('active');

      const targetHash = option.getAttribute('href') || '';
      if (!targetHash.startsWith('#')) return;

      const panelId = targetHash.slice(1);
      const matchingTab = document.querySelector(`.tab[data-tab="${panelId}"]`);
      if (matchingTab) {
        const tabs = document.querySelectorAll('.tab');
        const tabPanels = document.querySelectorAll('.tab-panel');
        tabs.forEach((tab) => tab.classList.remove('active'));
        matchingTab.classList.add('active');
        tabPanels.forEach((panel) => panel.classList.remove('active'));
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  const linkedSections = Array.from(menuOptions)
    .map((option) => option.getAttribute('href'))
    .filter((href) => href && href.startsWith('#'))
    .map((href) => document.querySelector(href))
    .filter((el) => Boolean(el));

  if (!linkedSections.length) {
    return;
  }

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        menuOptions.forEach((option) => {
          const isMatch = option.getAttribute('href') === `#${activeId}`;
          option.classList.toggle('active', isMatch);
        });
      });
    },
    { threshold: 0.4, rootMargin: '-15% 0px -40% 0px' }
  );

  linkedSections.forEach((section) => sectionObserver.observe(section));
}

function initMainMenuPreview() {
  const commandItems = document.querySelectorAll('.afro-command-item');
  const previewTitle = document.getElementById('afro-preview-title');
  const previewDesc = document.getElementById('afro-preview-desc');
  const previewMeta = document.getElementById('afro-preview-meta');
  const previewCode = document.getElementById('afro-preview-code');

  if (!commandItems.length || !previewTitle || !previewDesc || !previewMeta || !previewCode) {
    return;
  }

  const updatePreview = (item) => {
    previewTitle.textContent = item.dataset.previewTitle || 'Module';
    previewDesc.textContent = item.dataset.previewDesc || 'Open this module.';
    previewMeta.textContent = item.dataset.previewMeta || 'Section';
    previewCode.textContent = item.dataset.previewCode || 'MOD-00';
  };

  commandItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      commandItems.forEach((entry) => entry.classList.remove('active'));
      item.classList.add('active');
      updatePreview(item);
    });

    item.addEventListener('focus', () => {
      commandItems.forEach((entry) => entry.classList.remove('active'));
      item.classList.add('active');
      updatePreview(item);
    });
  });
}

// ===== TAB FUNCTIONALITY =====
const tabs = document.querySelectorAll('.tab');
const tabPanels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    // Add active class to clicked tab
    tab.classList.add('active');
    
    // Hide all panels
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Show corresponding panel
    const targetPanel = document.getElementById(tab.dataset.tab);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-in').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.98) 0%, rgba(20, 0, 4, 0.92) 100%)';
    nav.style.backdropFilter = 'blur(16px)';
  } else {
    nav.style.background =
      'linear-gradient(to bottom, rgba(0, 0, 0, 0.97) 0%, rgba(0, 0, 0, 0.88) 55%, transparent 100%)';
    nav.style.backdropFilter = 'blur(10px)';
  }
  
  lastScroll = currentScroll;
});

// ===== YEAR SELECT FOR MUSIC PAGE =====
const yearSelect = document.getElementById('year-select');
if (yearSelect) {
  // Album data for different years
  const yearlyAlbums = {
    '2025': [
      { rank: '01', title: 'God Does Like Ugly', artist: 'J.I.D', image: 'assets/Album Covers/2025/ugly.jpg' },
      { rank: '02', title: 'Dopamine', artist: 'Lil Tecca', image: 'assets/Album Covers/2025/dopamine.png' },
      { rank: '03', title: 'Debi Tirar Mas Fotos', artist: 'Bad Bunny', image: 'assets/Album Covers/2025/Bad_Bunny_-_Debí_Tirar_Más_Fotos.png' },
      { rank: '04', title: 'Heels Have Eyes 2', artist: 'Westside Gunn', image: 'assets/Album Covers/2025/heels.jpg' },
      { rank: '05', title: 'Alfredo 2', artist: 'Freddie Gibbs', image: 'assets/Album Covers/2025/alfredo.jpg' },
    ],
    '2024': [
      { rank: '01', title: 'Chromakopia', artist: 'Tyler, The Creator', image: 'assets/Album Covers/2024/chorma.jpg' },
      { rank: '02', title: 'Samurai', artist: 'Lupe Fiasco', image: 'assets/Album Covers/2024/samurai.jpg' },
      { rank: '03', title: 'Plan A', artist: 'Lil Tecca', image: 'assets/Album Covers/2024/plan.jpg' },
      { rank: '04', title: 'GNX', artist: 'Kendrick Lamar', image: 'assets/Album Covers/2024/Kendrick_Lamar_-_GNX.png' },
      { rank: '05', title: "Short n' Sweet", artist: 'Sabrina Carpenter', image: 'assets/Album Covers/2024/sweet.png' },
    ],
    '2023': [
      { rank: '01', title: 'Forward', artist: 'Jordan Ward', image: 'assets/Album Covers/2023/forward.jpg' },
      { rank: '02', title: 'Spiderman Across the Spiderverse', artist: 'Metro Boomin', image: 'assets/Album Covers/2023/spiderman.jpg' },
      { rank: '03', title: 'Larger Than Life', artist: 'Brent Faiyaz', image: 'assets/Album Covers/2023/brent.jpg' },
      { rank: '04', title: 'Scaring the Hoes', artist: 'Danny Brown', image: 'assets/Album Covers/2023/Scaringthehoes.webp' },
      { rank: '05', title: 'Lets Start Here', artist: 'Lil Yachty', image: 'assets/Album Covers/2023/Lets.jpg' },
    ],
    '2022': [
      { rank: '01', title: 'SOS', artist: 'SZA', image: 'assets/Album Covers/2022/sZa.jpg' },
      { rank: '02', title: '2000', artist: 'Joey Bada$$', image: 'assets/Album Covers/2022/2000.jpg' },
      { rank: '03', title: 'Entergalactic', artist: 'Kid Cudi', image: 'assets/Album Covers/2022/kidcudi.jpg' },
      { rank: '04', title: 'Tana Talk 4', artist: 'Benny the Butcher', image: 'assets/Album Covers/2022/tanatalk.jpg' },
      { rank: '05', title: 'Heroes and Villains', artist: 'Metro Boomin', image: 'assets/Album Covers/2022/hv.jpg' },
    ],
    '2021': [
      { rank: '01', title: 'Call Me If You Get Lost', artist: 'Tyler, The Creator', image: 'assets/Album Covers/2021/callme.jpg' },
      { rank: '02', title: 'Vince Staples', artist: 'Vince Staples', image: 'assets/Album Covers/2021/vince.jpg' },
      { rank: '03', title: 'The Off Season', artist: 'J. Cole', image: 'assets/Album Covers/2021/off.jpg' },
      { rank: '04', title: 'Alone at Prom', artist: 'Tory Lanez', image: 'assets/Album Covers/2021/alone.jpg' },
      { rank: '05', title: 'Sin City', artist: 'Ski Mask The Slump God', image: 'assets/Album Covers/2021/sin.jpg' },
    ],
    '2020': [
      { rank: '01', title: 'Alfredo', artist: 'Freddie Gibbs', image: 'assets/Album Covers/2020/alfredo.jpg' },
      { rank: '02', title: 'Circles', artist: 'Mac Miller', image: 'assets/Album Covers/2020/Mac_Miller_-_Circles.png' },
      { rank: '03', title: 'Eternal Atake', artist: 'Lil Uzi Vert', image: 'assets/Album Covers/2020/et.jpg' },
      { rank: '04', title: 'Spilligion', artist: 'Spillage Village', image: 'assets/Album Covers/2020/jid.jpg' },
      { rank: '05', title: 'Virgo World', artist: 'Lil Tecca', image: 'assets/Album Covers/2020/virgo.jpg' },
    ]
  };

  yearSelect.addEventListener('change', () => {
    const selectedYear = yearSelect.value;
    const albumList = document.getElementById('yearly-albums');
    const albums = yearlyAlbums[selectedYear] || yearlyAlbums['2025'];

    albumList.innerHTML = albums.map(album => `
      <div class="album-item">
        <span class="album-rank">${album.rank}</span>
        <img class="album-cover" src="${album.image}" alt="${album.title} album cover">
        <div class="album-info">
          <span class="album-title">${album.title}</span>
          <span class="album-artist">${album.artist}</span>
        </div>
        <span class="album-year">${selectedYear}</span>
      </div>
    `).join('');
  });
}

// ===== GALLERY LIGHTBOX (Basic) =====
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    // You can expand this to create a full lightbox
    item.classList.toggle('expanded');
  });
});

// ===== CARD HOVER EFFECTS =====
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mouseenter', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
});

// ===== PAGE LOAD ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
  initPageTransitions();
  initCarsMenuFocus();
  initMainMenuPreview();
  
  // Trigger animations for elements already in view
  const animatedElements = document.querySelectorAll('.animate-in');
  animatedElements.forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 100);
  });
});

// ===== TYPING EFFECT FOR HERO (Optional) =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== PARALLAX EFFECT (Subtle) =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero-content');
  
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - (scrolled * 0.002);
  }
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hey there, curious developer!', 'font-size: 20px; font-weight: bold;');
console.log('%cWant to connect? Reach out!', 'font-size: 14px; color: #ffd24a;');

