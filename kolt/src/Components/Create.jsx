import { useState } from "react";
import rand from './rand';

export default function Create({ setPaspirtukas, setMessages }) {

    const [state, setState] = useState('');
    const [date, setDate] = useState('');
    const [rida, setRida] = useState('');

    const getNextId = _ => {
        let nextId = localStorage.getItem("nextId");
        if (!nextId) {
            nextId = 1;
        } else {
            nextId = parseInt(nextId, 10);
        }
        localStorage.setItem("nextId", nextId + 1); 
        return nextId;
    };

    const handleState = id => {
        setState(s => s === id ? '' : id);
    };
    
    const addScooter = _ => {
        
        if (state === '') {            
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Pasirinkite būseną!'
            });
        };

        const today = new Date();
        let selectedDate = new Date(date)
        let year = today.getFullYear() - selectedDate.getFullYear();
        let month = today.getMonth() - selectedDate.getMonth();
        let day =  today.getDate() - selectedDate.getDate();
                
        if (isNaN(selectedDate)  || year < 0 || month < 0 || (month === 0 && day < 0)) { 
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Pasirinkite datą (data negali būti ateityje)!'                
            });
            
        };
        
        if (rida === '' || rida < 0) {            
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Įveskite ridą (rida negali būti neigiama)!'
            });
        };

        const newScooter = {    
            id: getNextId(),        
            code: rand(10000000, 99999999),
            state: state,
            date: date,
            rida: parseFloat(rida).toFixed(2)
        };

        setPaspirtukas(newScooter);
        setState('')
        setDate('');
        setRida('');
        setMessages({
            type: 'success', title: 'Valio!', text: 'Paspirtukas sėkmingai pridėtas!'
        });        
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