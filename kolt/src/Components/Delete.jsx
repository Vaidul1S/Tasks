export default function Delete({ deleteModal, setDeleteModal, setScooters, setMessages }) {

    const deleteScooter = _ => {
        setScooters(s => s.filter(s => s.code === deleteModal.code ? s.code !== deleteModal.code : s));
        setDeleteModal(null);
        setMessages({
            type: 'danger', title: 'Ištrinta!', text: 'Paspirtukas pašalintas iš sąrašo!'
        });
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Paspirtuko ištrynimo patvirtinimas!</h2>
                </div>
                <div className="modal-body">
                    <p>Ar, jūs, tikrai norite ištrinti pasirinktą paspirtuką iš sąrašo?</p>
                    <p>Paspirtuko id: <strong>{deleteModal.code}</strong></p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="button91 ecru" onClick={_ =>setDeleteModal(null)}>Grįžti</button>
                    <button type="button" className="button91 red" onClick={_ =>deleteScooter(deleteModal)}>Ištrinti</button>
                </div>
            </div>
        </div>
    )
}