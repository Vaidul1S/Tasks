import { pool } from "./pool";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function makeSecretSanta(groups) {
    const people = groups.flat();

    while (true) {
        const givers = shuffle([...people]);
        const receivers = shuffle([...people]);
        const pairs = [];
        let valid = true;

        for (let i = 0; i < givers.length; i++) {
            const giver = givers[i];
            const receiver = receivers[i];

            const groupG = groups.find(g => g.includes(giver));
            const groupR = groups.find(g => g.includes(receiver));

            if (giver === receiver || groupG === groupR) {
                valid = false;
                break;
            }
            pairs.push([giver, receiver]);
        }

        if (valid) return pairs;
    }
};

export const pairs = makeSecretSanta(pool);