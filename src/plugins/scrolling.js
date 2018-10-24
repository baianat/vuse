import 'intersection-observer';

const callback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio > 0.5) {
      entry.target.classList.add('is-active');
      entry.target.classList.remove('is-inactive');
      return;
    }
    entry.target.classList.add('is-inactive');
    entry.target.classList.remove('is-active');
  });
}

const observer = new IntersectionObserver(callback, {
  root: null,
  rootMargin: '0px',
  threshold: [0.1, 0.5, 0.9, 1]
});

const scrolling = (rootEl) => {
  if (!rootEl) return;
  let sections = Array.from(rootEl.querySelectorAll('section'));
  sections.forEach(section => {
    section.classList.add('is-inactive');
    observer.observe(section);
  });
}

export default function install ({ builder }) {
  builder.scrolling = scrolling;
};
