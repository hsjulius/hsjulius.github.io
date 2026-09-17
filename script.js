document.documentElement.classList.add('js');

// Full-screen viewer for the photography gallery
function initGallery(gallery) {
    const photos = [...gallery.querySelectorAll('.photo')];
    if (!photos.length) return;

    const box = document.createElement('div');
    box.className = 'lightbox';
    box.hidden = true;
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Photo viewer');
    box.innerHTML = `
        <button type="button" class="lightbox-close" aria-label="Close"><i class="fas fa-times" aria-hidden="true"></i></button>
        <button type="button" class="lightbox-nav lightbox-prev" aria-label="Previous photo"><i class="fas fa-chevron-left" aria-hidden="true"></i></button>
        <figure class="lightbox-figure">
            <img alt="">
            <figcaption><span class="lightbox-caption"></span><span class="lightbox-settings"></span></figcaption>
        </figure>
        <button type="button" class="lightbox-nav lightbox-next" aria-label="Next photo"><i class="fas fa-chevron-right" aria-hidden="true"></i></button>`;
    document.body.appendChild(box);

    const image = box.querySelector('img');
    const caption = box.querySelector('.lightbox-caption');
    const settings = box.querySelector('.lightbox-settings');
    const closeButton = box.querySelector('.lightbox-close');
    const buttons = [...box.querySelectorAll('button')];
    if (photos.length === 1) box.querySelectorAll('.lightbox-nav').forEach(b => (b.hidden = true));

    let index = 0;
    let returnFocus = null;

    function show(i) {
        index = (i + photos.length) % photos.length;
        const photo = photos[index];
        const thumb = photo.querySelector('img');
        image.src = photo.dataset.full || thumb.currentSrc || thumb.src;
        image.alt = thumb.alt;
        caption.textContent = photo.dataset.caption || '';
        settings.textContent = photo.dataset.settings || '';
    }

    function open(i) {
        returnFocus = document.activeElement;
        show(i);
        box.hidden = false;
        document.body.classList.add('lightbox-open');
        closeButton.focus();
    }

    function close() {
        box.hidden = true;
        document.body.classList.remove('lightbox-open');
        if (returnFocus) returnFocus.focus();
    }

    photos.forEach((photo, i) => {
        photo.querySelector('.photo-button').addEventListener('click', () => open(i));
    });
    closeButton.addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', () => show(index - 1));
    box.querySelector('.lightbox-next').addEventListener('click', () => show(index + 1));
    box.addEventListener('click', e => {
        if (e.target === box || e.target.classList.contains('lightbox-figure')) close();
    });

    document.addEventListener('keydown', e => {
        if (box.hidden) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowLeft') show(index - 1);
        else if (e.key === 'ArrowRight') show(index + 1);
        else if (e.key === 'Tab') {
            // Keep keyboard focus inside the viewer
            const visible = buttons.filter(b => !b.hidden);
            const current = visible.indexOf(document.activeElement);
            const next = (current + (e.shiftKey ? -1 : 1) + visible.length) % visible.length;
            visible[next].focus();
            e.preventDefault();
        }
    });

    // Swipe left/right on touch screens
    let touchX = null;
    box.addEventListener('touchstart', e => (touchX = e.touches[0].clientX), { passive: true });
    box.addEventListener('touchend', e => {
        if (touchX === null) return;
        const dx = e.changedTouches[0].clientX - touchX;
        if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
        touchX = null;
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.querySelector('.gallery');
    if (gallery) initGallery(gallery);

    // Footer year
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Nav border once the page is scrolled
    const nav = document.querySelector('.nav');
    if (nav) {
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    const reveals = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('visible'));
        return;
    }

    // Fade sections in as they scroll into view
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => revealObserver.observe(el));

    // Highlight the nav link for the section currently on screen
    const links = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            links.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => sectionObserver.observe(s));
});
