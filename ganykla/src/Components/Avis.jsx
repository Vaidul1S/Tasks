export default function Avis({id, perbegimas}) {
   
    return (
        <div onClick={_ => perbegimas(id)} style={{
            width: 80 + 'px',
            height: 80 + 'px',            
            borderRadius: '50%',
            margin: '20px',                     
        }}>
            {id}
        </div>
    );
}