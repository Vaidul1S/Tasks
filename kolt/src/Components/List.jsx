export default function List({scooters, setDeleteModal, setEditModal}) {

    return (

        <div className="container">
            <ul className="list" >
            <h3>Paspirtukų sąrašas</h3>
            {scooters.map(scooters =>  
            <li key={scooters.code}>                
                <div className="list-card">
                <div className="card-content">
                        <span className="list-stats">Paspirtuko id:</span><span>{scooters.id}</span> 
                    </div>
                    <div className="card-content">
                        <span className="list-stats">Paspirtuko kodas:</span><span>{scooters.code}</span> 
                    </div>
                    <div className="card-content">
                        <span className="list-stats">Paskutinio naudojimo data:</span><span>{scooters.date}</span>
                    </div>
                    <div className="card-content">
                        <span className="list-stats">Paspirtuko būsena:</span><span>{scooters.state}</span>
                    </div>
                    <div className="card-content">
                        <span className="list-stats">Paspirtuko rida (km):</span><span>{scooters.rida}</span>
                    </div>
                    
                    <div className="list-buttons">
                        <button className='button91 cadet'onClick={_ =>setEditModal(scooters)}>Redaguoti</button>
                        <button className='button91 red' onClick={_ =>setDeleteModal(scooters)}>Ištrinti</button>
                    </div>
                </div>
            </li>)}
            </ul>
        </div>
    )
}