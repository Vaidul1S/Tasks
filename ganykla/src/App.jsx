import { useCallback, useEffect, useState } from 'react';
import './App.css';
import './buttons.scss';
import rand from './Components/rand';
import Avis from './Components/Avis';
import Karve from './Components/Karve';

// REACT useState PROJECT (MyLittleFarm)


// Sukurti tuščią “Ganyklą”. Ją padalinti į dvi dalis su užrašais- Avys ir Karvės. Sukurti mygtuką “į ganyklą”, kurį paspaudus dešinė pusė būtų apgyvendinta avimis, kurias vaizduoja apskritimai, o kairė pusė karvėmis, kurias vaizduoja keturkampiai. Avių ir karvių skaičius rand 5 - 20. Kiekvieno gyvulio viduje yra random identifikacinis numeris: pvz avim A0254787, karvėm K0007898, kur skaičius yra septynženklis rand skaičius. Perkrovus puslapį avių ir karvių skaičius ir jų identifikaciniai numeriai turi nekisti (tik patį pirmą kartą “Ganykla” turi būti tuščia). Paspaudus ant avies arba karvės ji turi perbėgti į priešingą ganyklos pusę (antrą kartą paspaudus grįžti atgal). Perkrovus puslapį perbėgimai turi išlikti nepakitę. Pakartotinai paspaudus “į ganyklą”, turi atsirasti nauji gyvuliai, kaip ir pirmą kartą.

// Pastaba: karvė avių ganyklos pusėje lieka karve, o avis- avimi. Nemutuojam! Perbėgusios avys ir karvės yra dedamos į bandos galą. 


export default function App() {

    const [ganykla, setGanykla] = useState(JSON.parse(localStorage.getItem('ganykla')) ?? [])

    const localStore = useCallback(_ => {
        localStorage.setItem('ganykla', JSON.stringify(ganykla));
    }, [ganykla]);

    useEffect(_ => {
        localStore();
    }, [localStore]);

    const iGanykla = _ => {
        for (let i = 0; i < rand(5, 20); i++) {
            setGanykla(a => [...a, {
                id: 'A' + rand(1000000, 9999999),
                gardas: 'avide',
                kind: 'sheep'
            }]);
        }

        for (let i = 0; i < rand(5, 20); i++) {
            setGanykla(k => [...k, {
                id: 'K' + rand(1000000, 9999999),
                gardas: 'karvide',
                kind: 'cow'
            }]);
        }
    };

    const iSkerdykla = _ => {
        setGanykla([]);
    };

    const perbegimas = (id, gardas) => {

        if (gardas === 'avide') {
            setGanykla(g => [...g, { id: id, kind: 'sheep' && id.includes('A') ? 'sheep' : 'cow', gardas: 'karvide' }]);
            setGanykla(g => g.filter(g => g.gardas === 'avide' ? g.id !== id : g));
        } else {
            setGanykla(g => [...g, { id: id, kind: 'cow' && id.includes('K') ? 'cow' : 'sheep', gardas: 'avide' }]);
            setGanykla(g => g.filter(g => g.gardas === 'karvide' ? g.id !== id : g));
        }

    };

    return (
        <div className="app">
            <header className="app-header">
                <h3>Sveiki, atvykę į ganyklą.</h3>

                <div className="ganykla">
                    <div>
                        <h4>Avidės</h4>
                        <div className="sheeps">
                            {
                                ganykla.map(g => g.gardas === 'avide' ? <Avis key={g.id} id={g.id} perbegimas={perbegimas} kind={g.kind} gardas={g.gardas} /> : null)
                            }
                        </div>
                    </div>

                    <div>
                        <h4>Karvidės</h4>
                        <div className="cows">
                            {
                                ganykla.map(g => g.gardas === 'karvide' ? <Karve key={g.id} id={g.id} perbegimas={perbegimas} kind={g.kind} gardas={g.gardas} /> : null)
                            }

                        </div>

                    </div>
                </div>
                <div>
                    <button className="button27 green" onClick={iGanykla}>Į ganyklą</button>
                    <button className="button27 red" onClick={iSkerdykla}>Į skerdyklą</button>
                </div>

            </header>
        </div>
    );
};