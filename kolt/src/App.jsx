import { useState, useEffect, useCallback } from "react";
import './App.css';
import './buttons.scss';
import Create from './Components/Create';




export default function App() {

    const [paspirtukas, setPaspirtukas] = useState(null);
    const [scooters, setScooters] = useState(JSON.parse(localStorage.getItem('scooters')) ?? []);
    const [messages, setMessages] = useState([]);

    const addMessage = useCallback((message) => {
               
        setMessages(m => m.map(msg => msg));
                
        setTimeout(_ => {
            setMessages(m => m.filter(msg => msg))
        }, 2000)
    }, [setMessages]);

    const localStore = useCallback(_ => {        
        localStorage.setItem('scooters', JSON.stringify(scooters));
    },[scooters]);  
    
    useEffect(_ => {
        localStore();        
    }, [localStore]);   

    useEffect(_ => {
        if (null === paspirtukas) {
            return;
        };
        setScooters(s => [...s, paspirtukas])
    },[paspirtukas])

    return (
        <div className="app">
            <header className="app-header">
                <h2>Kolt paspirtukų nuoma</h2>

                <div>
                    <div className="box">
                        <div className="bin">
                            <Create setPaspirtukas={setPaspirtukas} addMessage={addMessage}/>
                        </div>
                        <div className="bin">
                            List
                        </div>
                    </div>
                </div>
            </header>
        </div>
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

