import { useState } from "react";
import { poolRestriction } from "./pool";

export default function Santa() {

    const [pair, setPair] = useState("");

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

    const pairs = makeSecretSanta(poolRestriction);

    function giver(name) {
        if(!pairs.includes(name)){
            setPair(p => p = "Wrong name!")
        }
    };

    function showPair(giver) {
        let ivestis = giver;

        if (localStorage.getItem('santa').includes(ivestis) || JSON.parse(localStorage.getItem('santa')) == null) {
            pairs.forEach(pair => {
                if (ivestis == pair[0]) {
                    result.style.color = 'white';
                    result.innerHTML = pair[0] + ' -> 🎁 ' + pair[1];
                }
            });

        } else {
            poolRestriction.forEach(e => {
                if (e.includes(ivestis)) {
                    result.style.color = 'red';
                    result.innerHTML = "Nešnipiniek!";

                }
            });
        }

        if (JSON.parse(localStorage.getItem('santa')) == null) {
            let poolIndex;
            poolRestriction.forEach(e => {
                if (e.indexOf(ivestis) >= 0) {
                    poolIndex = e;
                };
            })
            if (poolIndex == undefined) {
                poolIndex = null;
            }

            localStorage.setItem('santa', JSON.stringify(poolIndex));
        }

        vardas2.value = '';
    };

    return (
        <>
            <form action="" className="formContainer">
                <h3>With restrictions</h3>
                <input className="input2" type="text" placeholder="Įvesti vardą" onChange={_ => giver(e.target.value)}></input>
                <p className="text">Vardas turi būti iš didžiosios raidės ir su lietuviškom raidėm.</p>
                <button className="button27 green" onClick={_ => showPair(giver)}>OK</button>
                <h2 className="result">{pair}</h2>
            </form>
        </>
    )
}