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
    nav.style.background = 'rgba(10, 10, 15, 0.95)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), transparent)';
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
  document.body.classList.add('loaded');
  
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
console.log('%cWant to connect? Reach out!', 'font-size: 14px; color: #00ff88;');

