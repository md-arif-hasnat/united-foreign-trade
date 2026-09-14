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
const siteHeader = document.querySelector('.site-header');

const updateHeader = () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 20);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
});
navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('mousemove', (event) => {
  glow.style.opacity = '1';
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

document.querySelector('#year').textContent = new Date().getFullYear();

const inquiryForm = document.querySelector('#inquiry-form');
const inquiryButton = inquiryForm?.querySelector('.form-button');
const inquiryStatus = inquiryForm?.querySelector('.form-success');

inquiryForm?.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (!inquiryForm.checkValidity()) {
    inquiryForm.reportValidity();
    return;
  }

  const formData = new FormData(inquiryForm);

  inquiryButton.disabled = true;
  inquiryButton.innerHTML = 'Sending inquiry…';
  inquiryStatus.classList.remove('error');
  inquiryStatus.classList.add('show');
  inquiryStatus.textContent = 'Your inquiry is being sent securely…';

  try {
    const endpoint = inquiryForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData,
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success === false) {
      throw new Error(result.message || 'The inquiry service could not accept the message.');
    }

    inquiryStatus.textContent = 'Thank you. Your inquiry has been sent successfully.';
    inquiryForm.reset();
  } catch (error) {
    inquiryStatus.classList.add('error');
    inquiryStatus.textContent = 'We could not send your inquiry. Please email uftbdofficial@gmail.com or contact us on WhatsApp.';
  } finally {
    inquiryButton.disabled = false;
    inquiryButton.textContent = 'Send inquiry';
  }
});
