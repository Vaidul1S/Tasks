import { useState } from "react";
import rand from './rand';

export default function Create({ setPaspirtukas, addMessage }) {

    const [state, setState] = useState('');
    const [date, setDate] = useState('');
    const [rida, setRida] = useState('');

    const handleState = id => {
        setState(s => s === id ? '' : id);
    };

    const addScooter = _ => {
        const newScooter = {
            code: rand(10000000, 99999999),
            state: state,
            date: date,
            rida: parseFloat(rida).toFixed(2)
        };

        if (state === '') {            
            return addMessage({
                type: 'danger', title: 'Neteisingi duomenys', text: 'Pasirinkite būseną!'
            });
        };

        const today = new Date();
        if (date > today) {            
            return addMessage({
                type: 'danger', title: 'Neteisingi duomenys', text: 'Data negagli būti ateityje!'
            });
        };

        if (rida < 0) {            
            return addMessage({
                type: 'danger', title: 'Neteisingi duomenys', text: 'Rida negagli būti neigiama!'
            });
        };

        setPaspirtukas(newScooter);
        setState('')
        setDate('');
        setRida('');
    };

    return (
        <div className="container">
            <h3>Pridėti naują paspirtuką</h3>
            <div className="cardbody">

                <div className="card">
                    <label className="form-label">Pasirinkite būsena</label>
                    <div className="cbox">
                        <input type="checkbox" id="laisvas" checked={state === 'Laisvas'} onChange={_ => handleState('Laisvas')} />
                        <label className="state" htmlFor="laisvas">Laisvas</label>
                        <input type="checkbox" id="uzimtas" checked={state === 'Užimtas'} onChange={_ => handleState('Užimtas')} />
                        <label className="state" htmlFor="uzimtas">Užimtas</label>
                    </div>

                </div>

                <div className="card">
                    <label className="form-label">Paskutinio naudojimo data</label>
                    <input type="date" className="form-control" name="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>

                <div className="card">
                    <label className="form-label">Paspirtuko rida (km)</label>
                    <input type="number" className="form-control" name="rida" value={rida} onChange={e => setRida(e.target.value)} />
                </div>

            </div>
            <button className="button91 lime" onClick={addScooter}>Pridėti paspirtuką</button>


        </div>
    )
}