export default function Ganykla({avys, karves}) {
    
    return (
        <>
            <div className="ganykla">
                <div className="sheeps">
                    <h4>Avys</h4>
                    {avys}
                </div>

                <div className="cows">
                    <h4>Karvės</h4>
                    {karves}
                </div>

            </div>
            
        </>
    )
}