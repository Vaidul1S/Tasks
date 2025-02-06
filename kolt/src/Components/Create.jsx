export default function Create() {

    return (
        <div className="container">
            <h3>Pridėti naują paspirtuką</h3>
            <div className="cardbody">
                <div className="card">
                    <label className="form-label">Paspirtuko numeris</label>
                    <input type="number" className="form-control" />
                </div>

                <div className="card">
                    <label className="form-label">Paspirtuko id</label>
                    <input type="number" className="form-control" />
                </div>

                <div className="card">
                    <label className="form-label">Paspirtuko užimtumas</label>
                    <input type="checkbox" className="form-control" />
                </div>

                <div className="card">
                    <label className="form-label">Paskutinio naudojimo data</label>
                    <input type="date" className="form-control" name='name' />
                </div>

                <div className="card">
                    <label className="form-label">Paspirtuko rida</label>
                    <input type="number" className="form-control" />
                </div>
            </div>
            <button className="button91 lime">Pridėti paspirtuką</button>


        </div>
    )
}