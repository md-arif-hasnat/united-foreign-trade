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

document.querySelector('#inquiry-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const inquiryForm = event.currentTarget;
  const formData = new FormData(inquiryForm);
  const status = inquiryForm.querySelector('.form-success');
  const submitButton = inquiryForm.querySelector('button[type="submit"]');

  formData.set('_subject', `New website inquiry: ${formData.get('product')}`);
  status.className = 'form-success';
  status.textContent = '';
  submitButton.disabled = true;
  submitButton.innerHTML = 'Sending…';

  try {
    const response = await fetch('https://formsubmit.co/ajax/uftbdofficial@gmail.com', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    });
    const result = await response.json();
    if (!response.ok || result.success === false) throw new Error('Submission failed');

    inquiryForm.reset();
    status.textContent = 'Thank you — your inquiry has been sent successfully.';
    status.classList.add('show');
  } catch (error) {
    status.textContent = 'We could not send your inquiry. Please email uftbdofficial@gmail.com or contact us on WhatsApp.';
    status.classList.add('show', 'error');
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'Send inquiry <span>↗</span>';
  }
});
