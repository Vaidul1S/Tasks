import { useEffect, useState } from "react";

export default function Stats({ scooters }) {

    const [scooterCount, setScooterCount] = useState(0);
    const [scooterKm, setScooterKm] = useState(0);

    
    useEffect(_ => {
        setScooterCount(scooters.length);
        let total = 0;
        scooters.forEach(s => {
            total += parseFloat(s.rida);
        });
        setScooterKm(total.toFixed(2));
    }, [scooters]);

    return (
        <div className="stats-container">
            <button className="stats button91 ecru">Viso paspirtukų: {scooterCount}</button>
            <button className="stats button91 ecru">Viso kilomentrų: {scooterKm}</button>
        </div>
    )
}