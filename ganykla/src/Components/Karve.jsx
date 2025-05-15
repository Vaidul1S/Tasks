export default function Karve({ id, perbegimas, gardas, kind }) {

    return (
        <div className={kind} onClick={_ => perbegimas(id, gardas)}>{id}</div>
    );
};