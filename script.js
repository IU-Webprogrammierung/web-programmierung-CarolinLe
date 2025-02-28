// script.js Kontaktformular und Zeichenzähler

const form = document.querySelector('.contact-form');
const fields = ['name', 'email', 'message']; // IDs der Felder

// Zeichenzähler für das Textfeld
const messageField = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

messageField.addEventListener('input', () => {
    const remainingChars = 500 - messageField.value.length;
    charCounter.textContent = `${remainingChars} Zeichen`;
});

// Formularvalidierung
form.addEventListener('submit', (event) => {
    let isValid = true;

    fields.forEach((fieldId) => {
        const field = document.getElementById(fieldId);
        const errorMessage = field.nextElementSibling;

        if (!field.value.trim()) {
            // Fehler anzeigen
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
            // Fehler ausblenden
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
