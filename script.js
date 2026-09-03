const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach((element) => observer.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('nav');
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (event) => {
  glow.style.opacity = '1';
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelector('#year').textContent = new Date().getFullYear();

const requestedView = new URLSearchParams(window.location.search).get('view') === 'desktop' ? 'desktop' : 'mobile';
document.documentElement.dataset.view = requestedView;
document.querySelectorAll('.preview-toolbar a').forEach((link) => {
  link.classList.toggle('active', link.dataset.view === requestedView);
});

document.querySelector('#inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Export inquiry: ${form.get('product')}`);
  const body = encodeURIComponent(`Name: ${form.get('name')}\nCompany: ${form.get('company')}\nEmail: ${form.get('email')}\nProduct: ${form.get('product')}\nDestination: ${form.get('destination')}\n\nRequirement:\n${form.get('message')}`);
  event.currentTarget.querySelector('.form-success').classList.add('show');
  window.location.href = `mailto:uftbdofficial@gmail.com?subject=${subject}&body=${body}`;
});
