import { useState } from 'react';
import './App.css';
import './buttons.scss';
import rand from './Components/rand';
import Avis from './Components/Avis';
import Karve from './Components/Karve';

function App() {

    const [avys, setAvys] = useState([]);
    const [karves, setKarves] = useState([]);

    const iGanykla = _ => {
        for (let i = 0; i < rand(5, 20); i++) {
            setAvys(a => [...a, {
                id: 'A' + rand(1000000, 9999999),
                ganykla: true,
                kind: 'sheep'
            }]);
        }

        for (let i = 0; i < rand(5, 20); i++) {
            setKarves(k => [...k, {
                id: 'K' + rand(1000000, 9999999),
                ganykla: false,
                kind: 'cow'
            }]);
        }

    }

    const iSkerdykla = _ => {
        setAvys([]);
        setKarves([]);
    }

    const perbegimas = (id, ganykla) => {
        
        if (ganykla) {
            setKarves(k => [...k, {id: id, kind: 'sheep' && id.includes('A') ? 'sheep' : 'cow', ganykla: false}]);
            setAvys(a => a.filter(a => a.id !== id));
        } else {
            setAvys(a => [...a, {id: id, kind: 'cow' && id.includes('K') ? 'cow' : 'sheep', ganykla: true}]);
            setKarves(k => k.filter(k => k.id !== id));
        }
        
    }

    return (
        <div className="app">
            <header className="app-header">
                <h3>Ganykla</h3>

                <div className="ganykla">
                    <div>
                        <h4>Avys</h4>
                        <div className="sheeps">
                            {
                                avys.map(a => <Avis key={a.id} id={a.id} perbegimas={perbegimas} kind={a.kind} ganykla={a.ganykla}/>)
                            }
                        </div>
                    </div>

                    <div>
                        <h4>Karvės</h4>
                        <div className="cows">
                            {
                                karves.map(k => <Karve key={k.id} id={k.id} perbegimas={perbegimas} kind={k.kind} ganykla={k.ganykla}/>)
                            }

                        </div>

                    </div>
                </div>
                <div>
                    <button className="button27" onClick={iGanykla}>Į ganyklą</button>
                    <button className="button27" onClick={iSkerdykla}>Į skerdyklą</button>
                </div>

            </header>
        </div>
    );
}

export default App;

// REACT useState PROJECT (MyLittleFarm)


// Sukurti tuščią “Ganyklą”. Ją padalinti į dvi dalis su užrašais- Avys ir Karvės. Sukurti mygtuką “į ganyklą”, kurį paspaudus dešinė pusė būtų apgyvendinta avimis, kurias vaizduoja apskritimai, o kairė pusė karvėmis, kurias vaizduoja keturkampiai. Avių ir karvių skaičius rand 5 - 20. Kiekvieno gyvulio viduje yra random identifikacinis numeris: pvz avim A0254787, karvėm K0007898, kur skaičius yra septynženklis rand skaičius. Perkrovus puslapį avių ir karvių skaičius ir jų identifikaciniai numeriai turi nekisti (tik patį pirmą kartą “Ganykla” turi būti tuščia). Paspaudus ant avies arba karvės ji turi perbėgti į priešingą ganyklos pusę (antrą kartą paspaudus grįžti atgal). Perkrovus puslapį perbėgimai turi išlikti nepakitę. Pakartotinai paspaudus “į ganyklą”, turi atsirasti nauji gyvuliai, kaip ir pirmą kartą.

// Pastaba: karvė avių ganyklos pusėje lieka karve, o avis- avimi. Nemutuojam! Perbėgusios avys ir karvės yra dedamos į bandos galą. 
