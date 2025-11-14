import { useState } from "react";

export default function MakePool() {

    const [fams, setFams] = useState([]);

    const famNumb = (count) => {
        const newFam = Array.from({ length: count }, (_, i) => fams[i] || []);
        setFams(newFam);
    };

    const members = (famIndex, count) => {
        setFams((prev) => {
            const newFam = [...prev];
            newFam[famIndex] = Array.from(
                { length: count },
                (_, i) => newFam[famIndex]?.[i] || ""
            );
            return newFam;
        });
    };

    const membersNames = (famIndex, memberIndex, name) => {
        setFams((prev) => {
            const newFam = [...prev];
            newFam[famIndex][memberIndex] = name;
            return newFam;
        });
    };

    return (
        <>
            <div>
                <label>Number of Families: </label>
                <input
                    type="number"
                    min="0"
                    onChange={e => famNumb(Number(e.target.value))}
                />
            </div>

            {fams.map((fam, i) => (
                <div key={i}>
                    <h3>Family {i + 1}</h3>

                    <div>
                        <label>Number of Members: </label>
                        <input
                            type="number"
                            min="0"
                            value={fam.length}
                            onChange={e => members(i, Number(e.target.value))}
                        />
                    </div>

                    {fam.map((member, j) => (
                        <div key={j}>
                            <label>Member {j + 1} Name: </label>
                            <input
                                type="text"
                                value={member}
                                onChange={e => membersNames(i, j, e.target.value)}
                                placeholder="Enter name"
                            />
                        </div>
                    ))}
                </div>
            ))}

            <div >
                <h3>Resulting Array:</h3>
                <pre>{JSON.stringify(fams)}</pre>
                <button className="button27 dblue">Create</button>
            </div>
        </>
    )
};