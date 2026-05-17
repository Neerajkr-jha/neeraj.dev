const toggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');
toggle.addEventListener('click', () => navbar.classList.toggle('active'));
navbar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navbar.classList.remove('active'));
});


const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('nav a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 130) current = sec.getAttribute('id');
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

const typingEl = document.querySelector('.home-content h3');

const roles = [
  'Full Stack Developer',
  'CSE Student',
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const current = roles[roleIndex];

  typingEl.innerHTML =
    current.slice(0, charIndex) +
    '<span class="typing-cursor">|</span>';

  if (!isDeleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 80);

  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 45);

  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 1200 : 500);
  }
}

type();

const revealEls = document.querySelectorAll(
  '.project-card, .exp-card, .timeline-content, .sk-card, .contact-wrapper'
);

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // animate once
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

const cursor = document.createElement('div');
cursor.id = 'cursor-glow';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});

document.querySelectorAll('a, button, .btn, .project-card, .exp-card, .sk-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor-expand'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-expand'));
});

const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('title-visible');
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section-title').forEach(t => {
  t.classList.add('title-reveal');
  titleObserver.observe(t);
});

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Email

emailjs.init("vyp18lzBMOWTawLtH");

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_wrvzod3",
    "template_ly56tje",
    this
  )
  .then(() => {
    alert("Message sent successfully!");
    form.reset();
  })
  .catch((error) => {
    alert("Failed to send message.");
    console.log(error);
  });
});