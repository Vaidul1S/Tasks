import { useRef, useState } from "react";
import { poolRestriction } from "./functtions/pool";
import { pairs } from "./functtions/pairs";

export default function Santa() {

    localStorage.setItem('santa', JSON.stringify(null));

    const [pair, setPair] = useState("");
    const [name, setName] = useState("");
    const input = useRef(null);
    
    const addName = name => {
        setName(n => name);
    }

    const showPair = name => {
        let ivestis = name;

        if (localStorage.getItem('santa').includes(ivestis) || JSON.parse(localStorage.getItem('santa')) == null) {
            pairs.forEach(pair => {
                if (ivestis == pair[0]) {                    
                    setPair(pair[0] + ' -> 🎁 ' + pair[1]);
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
                <input className="input" type="text" placeholder="Įvesti vardą" onChange={addName} ref={input} value={name}></input>
                <p className="text">Vardas turi būti iš didžiosios raidės ir su lietuviškom raidėm.</p>
                <button className="button27 green" onClick={_ => showPair(giver)}>OK</button>
                <h2 className="result">{pair}</h2>
            </form>
        </>
    )
}