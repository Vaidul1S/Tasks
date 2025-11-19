import { useEffect, useRef, useState } from "react";
import { poolRestriction } from "./functtions/pool";
import { pairs } from "./functtions/pairs";

export default function Santa() {

    const input = useRef(null);
    const [pair, setPair] = useState(null);
    const [name, setName] = useState("");

    useEffect(_ => {
        if (!localStorage.getItem('santa')) {
            localStorage.setItem('santa', JSON.stringify(null));
        }
    }, []);

    const addName = name => {
        setName(name);
    };

    const showPair = name => {
        let ivestis;

        if (name.trim().length < 1) {
            setPair("Please enter a valid name!");
            return;
        } else {
            ivestis = name;
        }

        if(!pairs.flat().includes(ivestis)){
            setName("");
            setPair("Toki varda niera!");
            return;
        }


        if (localStorage.getItem('santa').includes(ivestis) || JSON.parse(localStorage.getItem('santa')) == null) {
            pairs.forEach(pair => {
                if (ivestis == pair[0]) {
                    setPair(pair[0] + ' 🎁 -> ' + pair[1]);
                }
            });

        } else {
            poolRestriction.forEach(e => {
                if (e.includes(ivestis)) {

                    setPair("Nešnipiniek!");

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

        setName("");

    };

    return (
        <>
            <div className="formContainer">
                {/* <h3>With restrictions</h3> */}
                <input className="input"
                    type="text"
                    placeholder="Įvesti vardą"
                    ref={input}
                    value={name}
                    onChange={e => addName(e.target.value)}
                />
                <p className="text">Vardas turi būti iš didžiosios raidės ir su lietuviškom raidėm.</p>
                <button type="submit" className="button27 green" onClick={_ => showPair(name)}>Rodyti</button>
                <h2 className="result">{pair}</h2>
            </div>
        </>
    )
}