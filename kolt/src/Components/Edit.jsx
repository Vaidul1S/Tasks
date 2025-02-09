export default function Edit({ editModal, setEditModal }) {

    const editScooter = _ => {
        
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
                        <span className="list-stats"><b>Paskutinio naudojimo data:</b></span><span>{editModal.date}</span>
                        <input type="date" className="edit-input" name="date" />
                    </div>
                    <div className="edit-content">
                        <span className="list-stats"><b>Paspirtuko būsena:</b></span><span>{editModal.state}</span>
                        <div >
                            <input type="checkbox" id="laisvas" checked={editModal.state === 'Laisvas'} />
                            <label className="state" htmlFor="laisvas">Laisvas</label>
                            <input type="checkbox" id="uzimtas" checked={editModal.state === 'Užimtas'} />
                            <label className="state" htmlFor="uzimtas">Užimtas</label>
                        </div>
                    </div>
                    <div className="edit-content">
                        <span className="list-stats"><b>Paspirtuko rida (km):</b></span><span>{editModal.rida}</span>
                        <input type="number" className="edit-input" name="rida" />
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