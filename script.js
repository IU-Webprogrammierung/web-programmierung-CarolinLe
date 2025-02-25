// script.js Zeichenzähler

const messageField = document.getElementById('message');
const charCounter = document.getElementById('char-counter');

messageField.addEventListener('input', () => {
    const remainingChars = 500 - messageField.value.length;
    charCounter.textContent = `${remainingChars} Zeichen`;
});