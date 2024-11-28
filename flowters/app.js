const phrases = [
    { id: 'phrase1', x: 50, y: 100, dx: 1, dy: 1 },
    { id: 'phrase2', x: 200, y: 200, dx: 1.5, dy: -1 },
    { id: 'phrase3', x: 400, y: 300, dx: -1, dy: 2 },
    { id: 'phrase4', x: 100, y: 400, dx: -2, dy: -1 },
    { id: 'phrase5', x: 300, y: 50, dx: 2, dy: 2 },
];

function movePhrases() {
    phrases.forEach(phrase => {
        const el = document.getElementById(phrase.id);

        phrase.x += phrase.dx;
        phrase.y += phrase.dy;

        if (phrase.x <= 0 || phrase.x + el.offsetWidth >= window.innerWidth) {
            phrase.dx *= -1;
        }
        if (phrase.y <= 0 || phrase.y + el.offsetHeight >= window.innerHeight) {
            phrase.dy *= -1;
        }

        el.style.left = `${phrase.x}px`;
        el.style.top = `${phrase.y}px`;
    });

    requestAnimationFrame(movePhrases);
}
// phrases.forEach(phrase => {
//     const el = document.getElementById(phrase.id);
//     el.style.left = `${phrase.x}px`;
//     el.style.top = `${phrase.y}px`;
// });

movePhrases();