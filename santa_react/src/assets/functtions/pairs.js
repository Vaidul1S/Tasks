import { pool } from "./pool";

// const pool = JSON.parse(localStorage.getItem('families'));

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function makeSecretSanta(pool) {
    const people = pool.flat();

    while (true) {
        const givers = shuffle([...people]);
        const receivers = shuffle([...people]);
        const pairs = [];
        let valid = true;

        for (let i = 0; i < givers.length; i++) {
            const giver = givers[i];
            const receiver = receivers[i];

            const givers_family = pool.find(g => g.includes(giver));
            const receivers_family = pool.find(g => g.includes(receiver));

            if (giver === receiver || givers_family === receivers_family) {
                valid = false;
                break;
            } else if (giver === 'Vaidas' && receiver === 'Radvilė') {
                valid = false;
                break;
            } else if (giver === 'Ramunė' && receiver === 'Dovydas') {
                valid = false;
                break;
            } 
            pairs.push([giver, receiver]);
        }

        if (valid) return pairs;
    }
};

export const pairs = makeSecretSanta(pool);