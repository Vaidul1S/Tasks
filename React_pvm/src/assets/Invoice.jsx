import { useEffect } from "react";
import { useState } from "react";

export default function Invoice() {

    const [invoice, setInvoice] = useState(null);

    useEffect(() => {
        fetch('https://in3.dev/inv/')
            .then(response => response.json())
            .then(data => setInvoice(data));
    }, []);

    if (!invoice) return <p>Loading...</p>;

    const { number, date, due_date, company, items, shippingPrice } = invoice;
    const { buyer, seller } = company;

    let subtotal = 0;
    let totalVAT = 0;

    const itemRows = items.map((item, index) => {
        const { description, discount, price, quantity } = item;

        let afterDiscount = price;
        if (discount.type === 'percentage') {
            afterDiscount = price - (price * discount.value / 100);
        } else if (discount.type === 'fixed') {
            afterDiscount = price - discount.value;
        }

        const vatAmount = afterDiscount * 0.21 * quantity;
        const total = afterDiscount * quantity + vatAmount;

        subtotal += total;
        totalVAT += vatAmount;

        return (
            <div key={index} className="first">
                <div>{`00${index + 1}`}</div>
                <div>{description}</div>
                <div className="right">{quantity}</div>
                <div className="right">{price.toFixed(2)}</div>
                <div className="right">{discount.type === 'percentage' ? `${discount.value}%` : discount.type === 'fixed' ? `${discount.value} €` : '-'}</div>
                <div className="right">{afterDiscount.toFixed(2)}</div>
                <div className="right">21%</div>
                <div className="right">{vatAmount.toFixed(2)}</div>
                <div className="right">{total.toFixed(2)}</div>
            </div>
        );
    });


    return (
        <div className="container">
            <h1>PVM sąskaita faktūra</h1>
            <span id="data-nr">Nr:{number}</span>
            <p id="data-dokData">Dok. data: {date}</p>
            <p className="apmoketi" id="data-apmoketi">Apmokėti iki: {due_date}</p>
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
                    <div>{seller.name}</div>
                    <div>{seller.address}</div>
                    <div>{seller.code}</div>
                    <div>{seller.vat}</div>
                    <div>{seller.phone}</div>
                    <div>{seller.email}</div>
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
                    <div>{buyer.name}</div>
                    <div>{buyer.address}</div>
                    <div>{buyer.code}</div>
                    <div>{buyer.vat}</div>
                    <div>{buyer.phone}</div>
                    <div>{buyer.email}</div>
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
                            <div className="data" id="data-tarpine">{subtotal.toFixed(2)} €</div>
                        </div>
                        <div>
                            <div className="text">Transportavimo išlaidos:</div>
                            <div className="data" id="data-pristatymas">{shippingPrice.toFixed(2)} €</div>
                        </div>
                        <div>
                            <div className="text">Viso PVM (21%):</div>
                            <div className="data visoPvm" id="data-visoPvm">{(totalVAT + shippingPrice * 0.21).toFixed(2)} €</div>
                        </div>
                        <div>
                            <div className="text galutine">Galutinė suma:</div>
                            <div className="data viso" id="data-viso">{(subtotal + shippingPrice).toFixed(2)} €</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}