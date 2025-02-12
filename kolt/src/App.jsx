import { useState, useEffect, useCallback } from "react";
import './App.css';
import './buttons.scss';
import Create from './Components/Create';
import List from "./Components/List";
import Delete from "./Components/Delete";
import Message from "./Components/Message";
import Edit from "./Components/Edit";
import Stats from "./Components/Stats";

export default function App() {

    const [paspirtukas, setPaspirtukas] = useState(null);
    const [scooters, setScooters] = useState(JSON.parse(localStorage.getItem('scooters')) ?? []);
    const [messages, setMessages] = useState([]);
    const [deleteModal, setDeleteModal] = useState(null);
    const [showMsg, setShowMsg] = useState(null);
    const [editModal, setEditModal] = useState(null);
    const [editedPaspirtukas, setEditedPaspirtukas] = useState(null);

    const localStore = useCallback(_ => {
        localStorage.setItem('scooters', JSON.stringify(scooters));
    }, [scooters]);

    useEffect(_ => {
        setShowMsg('');
        setTimeout(_ => {
            setShowMsg(null)
        }, 3000);

    }, [messages]);

    useEffect(_ => {
        localStore();
    }, [localStore]);

    useEffect(_ => {
        if (null === paspirtukas) {
            return;
        };
        setScooters(s => [paspirtukas, ...s])
    }, [paspirtukas]);

    useEffect(_ => {
        if (null === editedPaspirtukas) {
            return;
        };
        setScooters(s => s.map(s => editedPaspirtukas.code === s.code ? { ...s, ...editedPaspirtukas } : s));
    }, [editedPaspirtukas]);

    const orderByDate = _ => {
        setScooters(s => [...s].sort((a,b) => new Date(b.date) - new Date(a.date)));
    };

    const orderByKm = _ => {
        setScooters(s => [...s].sort((a,b) => a.rida - b.rida));
    };

    return (
        <>
            <header className="app-header">
                <div className="content">
                    <h1>Kolt paspirtukų nuoma</h1>
                    <div className="box">
                        <div className="bin">
                            <div>
                                <button className="button91 tang" onClick={orderByDate}>Rikiuoti pagal paskutinę naudojimo datą</button>
                                <button className="button91 tang" onClick={orderByKm}>Rikiuoti pagal ridą</button>
                            </div>
                            <List scooters={scooters} setDeleteModal={setDeleteModal} setEditModal={setEditModal} />
                        </div>
                        <div className="bin">
                            <Stats scooters={scooters} />
                            <Create setPaspirtukas={setPaspirtukas} setMessages={setMessages} />
                        </div>
                    </div>
                </div>
            </header>
            {
                deleteModal !== null ? <Delete deleteModal={deleteModal} setScooters={setScooters} setDeleteModal={setDeleteModal} setMessages={setMessages} /> : null
            }
            {
                showMsg !== null ? <Message messages={messages} setMessages={setMessages} /> : null
            }
            {
                editModal !== null ? <Edit editModal={editModal} setEditModal={setEditModal} setEditedPaspirtukas={setEditedPaspirtukas} setMessages={setMessages} /> : null
            }
        </>
    );
};

// localStorage CRUD “Kolt paspirtukų nuoma”


// Sukurkite duomenų struktūrą localStorage pagal schemą:
// id: int(nuo 1);
// registrationCode: string(8);
// isBusy: int(1);
// lastUseTime: date;
// totalRideKilometres: float(du skaičiai po kablelio);

// Užduotis 1.
// Naudodami React biblioteką sukurkite vieno puslapio aplikaciją (SPA), kurioje vartotojas galėtų atlikti pilną “Kolt” paspirtukų administravimą (CRUD). Kiekvienas paspirtukas turi turėti savo vizualiai atskirtą aprašą (eilutę), kuriame būtų pateikta visa informaciją apie jį. Šalia turi būti mygtukas “Trinti”, kurį paspaudus atitinkamo paspirtuko įrašas būtų pašalinamas iš localStorage. Šalia turi būti mygtukas “Redaguoti”, kurį paspaudus atitinkamo paspirtuko įrašas būtų atvaizduojamas modal lange su galimybe jį redaguoti, o redaguotą įrašą išsaugoti  localStorage.
// Redagavimo langas turi atrodyti sekančiai. Atvaizduojama registrationCode  reikšmė (neredaguojama). Šalia įrašo su paskutinio naudojimo data (neredaguojama) turi būti tuščias laukelis su naujos datos įvedimu (redaguojama). Šalia laukelio su paspirtuko rida (kilometrais, neredaguojama) turi būti laukelis, kuriame galima būtų įvesti tos dienos paspirtuku nuvažiuotą atstumą. Per dieną nuvažiuoti kilometrai sumuojasi su bendru kiekiu ir suma įrašoma į localStorage. Įrašas iš localStorage laukelio isBusy turi būti paverčiamas į “užimtas” arba “laisvas”, priklausomai nuo laukelio reikšmės. Šalia šio laukelio turi būti checkbox tipo įvedimas, kuris leistų keisti užimtumą. Duomenų redagavimas turi būti atliekamas paspaudus “Saugoti” mygtuką, esantį radagavimo modale. Registracijos kodas (aštuoni rand raidiniai skaitiniai simboliai) neturi būti radaguotinas (įrašomas tik kuriant naują paspirtuką).
// Paspirtukų aprašo viršuje (arba apačioje arba šone) turi būti atvaizduota tuščia forma su naujam paspirtukui įvesti skirtais laukeliais ir mygtukas “Pridėti” formos vykdymui. Laukeliui isBusy skirto įvedimo, kuriant naują paspirtuką daryti nereikia, nes naujai sukurtas paspirtukas visada turi būti “laisvas”. registrationCode reikšmė turi būti sukuriama rand kodo, o ne įvedinėjama.

// Užduotis 2.
// Sukurkite statistikos laukelius, kuriuose būtų atvaizduojamas paspirtukų kiekis ir bendras visų paspirtukų nuvažiuotas kilometrų kiekis (duomenys gaunami iš localStorage) Keičiantis localStorage įrašams automatiškai turi keistis ir statistika.

// Užduotis 3.
// Sukurkite rūšiavimo galimybę pagal nuvažiuotų kilometrų kiekį ir paskutinio naudojimo datą (sukurkite du mygtukus, kuriuos paspaudus paspirtukų aprašai išsirikiuotų atitinkama tvarka). Tam panaudokite React galimybes.

// Pastabos
// Aplikacija turi atrodyti estetiškai ir turi būti padaryta adaptyvaus dydžio (responsive).
// Galite prisidėti prie aplikacijos tobulinimo ir pridėti naujų, sąlygoje neaprašytų funkcionalumų ar vartotojo patirtį gerinančių patobulinimų.

