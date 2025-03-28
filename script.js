// script.js

// 1. Kontaktformular und Zeichenzähler
const form = document.querySelector('.contact-form');
const fields = ['name', 'email', 'message'];
const messageField = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

// Zeichenzähler
if (messageField && charCounter) {
    messageField.addEventListener('input', () => {
        const remainingChars = 500 - messageField.value.length;
        charCounter.textContent = `${remainingChars} Zeichen`;
    });
}

// Formularvalidierung
if (form) {
    form.addEventListener('submit', (event) => {
        let isValid = true;

        fields.forEach((fieldId) => {
            const field = document.getElementById(fieldId);
            if (!field) return; 
            const errorMessage = field.nextElementSibling;

            if (!field.value.trim()) {
                field.classList.add('error');
                if (!errorMessage) {
                    const error = document.createElement('div');
                    error.className = 'error-message';
                    error.textContent = 'Bitte ausfüllen';
                    field.after(error);
                } else {
                    errorMessage.style.display = 'block';
                }
                isValid = false;
            } else {
                field.classList.remove('error');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });
}

// 2. Overlay-Funktionalität
function openOverlay(element) {
    const overlay = document.getElementById('overlay');
    const overlayImage = document.getElementById('overlay-image');
    if (overlay && overlayImage) {
        overlayImage.src = element.src;
        overlay.style.display = 'flex';
    }
}

function closeOverlay(event) {
    if (event.target.id === 'overlay' || event.target.classList.contains('close-btn')) {
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';
    }
}

const overlay = document.getElementById('overlay');
if (overlay) {
    overlay.addEventListener('click', closeOverlay);
}

// Funktion für Drag-Scrolling mit Inertia-Effekt
const gallerySlider = document.querySelector('.gallery-slider');

let isDown = false;
let startX = 0;
let scrollLeft = 0;
let velocity = 0;
let isDragging = false;
let animationFrame;

// Maus- und Touch-Events
gallerySlider.addEventListener('mousedown', startDrag);
gallerySlider.addEventListener('mouseleave', stopDrag);
gallerySlider.addEventListener('mouseup', stopDrag);
gallerySlider.addEventListener('mousemove', drag);
gallerySlider.addEventListener('wheel', handleWheelScroll);

// Dragging starten
function startDrag(e) {
    isDown = true;
    isDragging = true;
    gallerySlider.classList.add('active');
    startX = e.pageX - gallerySlider.offsetLeft;
    scrollLeft = gallerySlider.scrollLeft;
    velocity = 0; 
    cancelAnimationFrame(animationFrame); 
}

// Während des Dragging
function drag(e) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - gallerySlider.offsetLeft;
    const walk = (x - startX) * 2; 
    gallerySlider.scrollLeft = scrollLeft - walk;
    velocity = -walk; 
}

// Dragging stoppen
function stopDrag() {
    if (!isDown) return;
    isDown = false;
    isDragging = false;
    gallerySlider.classList.remove('active');
    startInertiaScroll(); 
}

// Inertia Scroll mit `requestAnimationFrame`
function startInertiaScroll() {
    const friction = 0.95; 
    function inertia() {
        if (Math.abs(velocity) < 0.1 || isDragging) {
            cancelAnimationFrame(animationFrame); 
            return;
        }
        gallerySlider.scrollLeft += velocity; 
        velocity *= friction; 
        animationFrame = requestAnimationFrame(inertia); 
    }
    animationFrame = requestAnimationFrame(inertia);
}

// Horizontales Scrollen mit Mausrad
function handleWheelScroll(e) {
    e.preventDefault();
    gallerySlider.scrollLeft += e.deltaY * 1.5; 
}
