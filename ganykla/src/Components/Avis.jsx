export default function Avis({id, perbegimas, ganykla, kind}) {
   
    return (
        <div className={kind} onClick={_ => perbegimas(id, ganykla)} style={{
            width: 80 + 'px',
            height: 80 + 'px',           
            margin: '10px',                     
        }}>
            {id}
        </div>
    );
}