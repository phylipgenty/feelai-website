// Rotating text animation
var typed = new Typed("#changing-text", {
  strings: [
    "like you do.",
    "for the street.",
    "in real time.",
    "pure Nigerian Pidgin."
  ],
  typeSpeed: 70,
  backSpeed: 40,
  backDelay: 1800,
  loop: true
});

// Mobile Navbar Toggle & Auto-close on click
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-xmark');
    }
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-xmark');
      }
    }
  });
});

// Scroll Reveal Animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(section => {
  revealObserver.observe(section);
});

// Neon particle background with subtle connections
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const colors = ["#00ffcc", "#0aff9d", "#00b4d8"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const particleCount = window.innerWidth < 768 ? 35 : 65;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2.5 + 1,
    color: colors[Math.floor(Math.random() * colors.length)],
    speedX: (Math.random() - 0.5) * 0.6,
    speedY: (Math.random() - 0.5) * 0.6
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 12;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    // Connect nearby particles
    for (let j = i + 1; j < particles.length; j++) {
      let p2 = particles[j];
      let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
      if (dist < 100) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(0, 255, 204, ${0.15 * (1 - dist / 100)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(drawParticles);
}
drawParticles();

// Donation Modal Handling
const donateBtns = document.querySelectorAll('.donate-btn');
const modal = document.getElementById('donateModal');
const closeModal = document.getElementById('closeDonate');

donateBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (modal) modal.classList.add('active');
  });
});

if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });
}

// Donation option selection
document.querySelectorAll('.donate-opt').forEach(opt => {
  opt.addEventListener('click', function() {
    document.querySelectorAll('.donate-opt').forEach(o => o.style.borderColor = 'rgba(0, 255, 204, 0.2)');
    this.style.borderColor = '#00ffcc';
  });
});
