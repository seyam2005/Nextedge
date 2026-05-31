/* ── MOUSE GLOW ── */
const mouseGlow = document.getElementById('mouseGlow') || document.querySelector('.mouse-glow');
if (mouseGlow) {
  document.addEventListener('mousemove', (e) => {
    mouseGlow.style.left = e.clientX + 'px';
    mouseGlow.style.top  = e.clientY + 'px';
  });
}
/* ── CUSTOM CURSOR ── */
const cursor = document.querySelector('.cursor');
const ring   = document.querySelector('.cursor-ring');

if (cursor && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
  });

  function animateRing() {
    ringX += (mouseX - ringX - 18) * 0.12;
    ringY += (mouseY - ringY - 18) * 0.12;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll(
    'a, button, .project-card, .gallery-item, .sport-card, .social-card, .ai-orb, .chip, .tool-grid div'
  ).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}
