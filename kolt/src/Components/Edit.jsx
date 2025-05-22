import { useState } from "react";

export default function Edit({ editModal, setEditModal, setEditedPaspirtukas, setMessages }) {

    const [editedState, setEditedState] = useState('');
    const [editedDate, setEditedDate] = useState('');
    const [editedRida, setEditedRida] = useState('');

    const handleEditedState = id => {
        setEditedState(e => e === id ? '' : id);
    };

    const editScooter = _ => {
        const editedScooter = {
            code: editModal.code,
            state: editedState,
            date: editedDate,
            rida: (parseFloat(editModal.rida) + parseFloat(editedRida)).toFixed(2)
        };

        if (editedState === '') {
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Pasirinkite būseną!'
            });
        };

        const oldDate = new Date(editModal.date);
        let selectedDate = new Date(editedDate)
        let year = selectedDate.getFullYear() - oldDate.getFullYear();
        let month = selectedDate.getMonth() - oldDate.getMonth();
        let day =  selectedDate.getDate() - oldDate.getDate();

        const today = new Date();        
        let yearT = today.getFullYear() - selectedDate.getFullYear();
        let monthT = today.getMonth() - selectedDate.getMonth();
        let dayT =  today.getDate() - selectedDate.getDate();

        if (isNaN(selectedDate) || year < 0 || month < 0 || (month === 0 && day < 0) || yearT < 0 || monthT < 0 || (monthT === 0 && dayT < 0)) {
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Pasirinkite datą (data negali būti ateityje arba ankstesnė nei paskutinio naudojimo)!'
            });

        };

        if (editedRida === '' || editedRida < 0) {
            return setMessages({
                type: 'danger', title: 'Neteisingi duomenys!', text: 'Įveskite ridą (rida negali būti atsukta)!'
            });
        };

        setEditedPaspirtukas(editedScooter);
        setEditedState('')
        setEditedDate('');
        setEditedRida('');
        setEditModal(null);
        setMessages({
            type: 'success', title: 'Valio!', text: 'Paspirtuko duomenys sėkmingai atnaujinti!'
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Redaguoti paspirtuką</h2>
                <div className="edit-body">

                    <div className="edit-content">
                        <span className="list-stats"><b>Paspirtuko id:</b></span><span>{editModal.code}</span>
                    </div>

                    <div className="edit-content">
                        <span className="list-stats"><b>Paspirtuko būsena:</b></span><span>{editModal.state}</span>
                        <div >
                            <input type="checkbox" id="editLaisvas" checked={editedState === 'Laisvas'} onChange={_ => handleEditedState('Laisvas')} />
                            <label className="state" htmlFor="editLaisvas">Laisvas</label>
                            <input type="checkbox" id="editUzimtas" checked={editedState === 'Užimtas'} onChange={_ => handleEditedState('Užimtas')} />
                            <label className="state" htmlFor="editUzimtas">Užimtas</label>
                        </div>
                    </div>

                    <div className="edit-content">
                        <span className="list-stats"><b>Paskutinio naudojimo data:</b></span><span>{editModal.date}</span>
                        <input type="date" className="edit-input" name="date" value={editedDate} onChange={e => setEditedDate(e.target.value)} />
                    </div>

                    <div className="edit-content">
                        <span className="list-stats"><b>Paspirtuko rida (km):</b></span><span>{editModal.rida}</span>
                        <input type="number" className="edit-input" name="rida" value={editedRida} onChange={e => setEditedRida(e.target.value)} />
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="button91 ecru" onClick={_ => setEditModal(null)}>Grįžti</button>
                    <button className="button91 lime" onClick={editScooter}>Redaguoti paspirtuką</button>
                </div>
            </div>
        </div>
    )
}