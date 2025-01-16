export default function Karve({id, perbegimas}) {
   
    return (
        <div onClick={_ => perbegimas(id)} style={{
            width: 80 + 'px',
            height: 80 + 'px',            
            borderRadius: '3px',
            margin: '20px',                                  
        }}>
            {id}
        </div>
    );
}