export default function Karve({id, perbegimas, color, kind}) {
   
    return (
        <div onClick={_ => perbegimas(id)} style={{
            width: 80 + 'px',
            height: 80 + 'px',            
            borderRadius: kind,
            backgroundColor: color,             
            backgroundImage: 'url("./src/Components/cow.jpg")',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            margin: '10px',                                  
        }}>
            {id}
        </div>
    );
}