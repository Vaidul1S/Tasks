import { useState } from "react"

export default function MakePool() {

    const [fams, setFams] = useState([]);

    const famNumb = (count) => {
        const newFam = Array.from({ length: count }, (_, i) => families[i] || []);
        setFams(newFam);
    };

    const members = (famIndex, count) => {
        setFamilies((prev) => {
            const newFam = [...prev];
            newFamilies[famIndex] = Array.from(
                { length: count },
                (_, i) => newFam[famIndex]?.[i] || ""
            );
            return newFam;
        });
    };

    const membersNames = (famIndex, memberIndex, name) => {
        setFamilies((prev) => {
            const newFam = [...prev];
            newFam[famIndex][memberIndex] = name;
            return newFam;
        });
    };

    return (
        <>
            <div>
                <h1>Make Pool</h1>
                <input type="text" placeholder="Enter a number of families" value={fams} />
                <button type="submit" className="button27 blue" onClick={_ => setFams(famsNumb)}></button>
            </div>
        </>
    )
}