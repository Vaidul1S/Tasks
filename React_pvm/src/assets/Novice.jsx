

export default function Notice() {

    return (
        <div classname="container">
            <h1>PVM sąskaita faktūra</h1>
            <span data-nr>Nr:</span>
            <p data-dokData>Dok. data:</p>
            <p classname="apmoketi" data-apmoketi>Apmokėti iki:</p>
            <div classname="rekvizitai">
                <div classname="atributes">
                    <h3>Pardavėjas</h3>
                    <div>Įmonės pavadinimas:</div>
                    <div>Adresas:</div>
                    <div>Įmonės kodas:</div>
                    <div>PVM mok. kodas:</div>
                    <div>Tel.:</div>
                    <div>Email:</div>
                </div>
                <div classname="seller" data-seller>
                    <h3>---</h3>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div classname="atributes">
                    <h3>Pirkėjas</h3>
                    <div>Įmonės pavadinimas:</div>
                    <div>Adresas:</div>
                    <div>Įmonės kodas:</div>
                    <div>PVM mok. kodas:</div>
                    <div>Tel.:</div>
                    <div>Email:</div>
                </div>
                <div classname="buyer" data-buyer>
                    <h3>---</h3>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div classname="saskaita">
                <table data-list>
                    <tr classname="first">
                        <td>Kodas</td>
                        <td>Prekės pavadimas</td>
                        <td classname="right">Kiekis (vnt)</td>
                        <td classname="right">Kaina € (be nuolaidos)</td>
                        <td classname="right">Nuolaida</td>
                        <td classname="right">Kaina € (po nuolaidos)</td>
                        <td classname="right">PVM %</td>
                        <td classname="right">PVM suma €</td>
                        <td classname="right">Suma €</td>
                    </tr>

                </table>
                <div classname="total">
                    <div classname="buha">
                        <div classname="sas">Sąskaitą išrašė:</div>
                        <div classname="bu">B. Babrauskas</div>
                    </div>
                    <div classname="sums">
                        <div>
                            <div classname="text">Tarpinė suma:</div>
                            <div classname="data" data-tarpine></div>
                        </div>
                        <div>
                            <div classname="text">Transportavimo išlaidos:</div>
                            <div classname="data" data-pristatymas></div>
                        </div>
                        <div>
                            <div classname="text">Viso PVM (21%):</div>
                            <div classname="data visoPvm" data-visoPvm></div>
                        </div>
                        <div>
                            <div classname="text galutine">Galutinė suma:</div>
                            <div classname="data viso" data-viso></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}