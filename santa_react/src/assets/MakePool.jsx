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
                <label>Number of Families:</label>
                <input
                    type="number"
                    min="0"
                    onChange={(e) => famNumb(Number(e.target.value))}
                />
            </div>

            {fams.map((fam, i) => (
                <div key={i} >
                    <h3 >Family {i + 1}</h3>

                    <div>
                        <label >Number of Members:</label>
                        <input
                            type="number"
                            min="0"
                            value={fam.length}
                            onChange={(e) => members(i, Number(e.target.value))}
                        />
                    </div>

                    {fams.map((member, j) => (
                        <div key={j}>
                            <label >
                                Member {j + 1} Name:
                            </label>
                            <input
                                type="text"
                                value={member}
                                onChange={(e) => membersNames(i, j, e.target.value)}
                                placeholder="Enter name"
                            />
                        </div>
                    ))}
                </div>
            ))}

            <div >
                <h3>Resulting Array:</h3>
                <pre>{JSON.stringify(fams, null, 2)}</pre>
            </div>
        </>
    )
}