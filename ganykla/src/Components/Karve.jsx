export default function Karve({id, perbegimas, ganykla, kind}) {
   
    return (
        <div className={kind} onClick={_ => perbegimas(id, ganykla)}>{id}</div>
    );
}