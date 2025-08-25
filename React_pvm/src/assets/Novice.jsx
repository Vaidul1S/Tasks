

export default function Novice() {

    return (
        <div className="container">
            <h1>PVM sąskaita faktūra</h1>
            <span id="data-nr">Nr:</span>
            <p id="data-dokData">Dok. data:</p>
            <p className="apmoketi" id="data-apmoketi">Apmokėti iki:</p>
            <div className="rekvizitai">
                <div className="atributes">
                    <h3>Pardavėjas</h3>
                    <div>Įmonės pavadinimas:</div>
                    <div>Adresas:</div>
                    <div>Įmonės kodas:</div>
                    <div>PVM mok. kodas:</div>
                    <div>Tel.:</div>
                    <div>Email:</div>
                </div>
                <div className="seller" id="data-seller">
                    <h3>---</h3>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="atributes">
                    <h3>Pirkėjas</h3>
                    <div>Įmonės pavadinimas:</div>
                    <div>Adresas:</div>
                    <div>Įmonės kodas:</div>
                    <div>PVM mok. kodas:</div>
                    <div>Tel.:</div>
                    <div>Email:</div>
                </div>
                <div className="buyer" id="data-buyer">
                    <h3>---</h3>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>

            <div className="saskaita">
                <div id="data-list">
                    <div className="first">
                        <div>Kodas</div>
                        <div>Prekės pavadimas</div>
                        <div className="right">Kiekis (vnt)</div>
                        <div className="right">Kaina € (be nuolaidos)</div>
                        <div className="right">Nuolaida</div>
                        <div className="right">Kaina € (po nuolaidos)</div>
                        <div className="right">PVM %</div>
                        <div className="right">PVM suma €</div>
                        <div className="right">Suma €</div>
                    </div>

                </div>
                <div className="total">
                    <div className="buha">
                        <div className="sas">Sąskaitą išrašė:</div>
                        <div className="bu">B. Babrauskas</div>
                    </div>
                    <div className="sums">
                        <div>
                            <div className="text">Tarpinė suma:</div>
                            <div className="data" id="data-tarpine"></div>
                        </div>
                        <div>
                            <div className="text">Transportavimo išlaidos:</div>
                            <div className="data" id="data-pristatymas"></div>
                        </div>
                        <div>
                            <div className="text">Viso PVM (21%):</div>
                            <div className="data visoPvm" id="data-visoPvm"></div>
                        </div>
                        <div>
                            <div className="text galutine">Galutinė suma:</div>
                            <div className="data viso" id="data-viso"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}