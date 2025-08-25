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

    
                // const {number, date, due_date, company, items, shippingPrice} = data;

                // const {buyer, seller} = company;
                // let i = 0;
                // pirkejas.forEach(div => {
                // const {name, address, code, vat, phone, email} = buyer;
                // const Buyer = Object.values(buyer);                 
                //     div.innerText = Buyer[i];
                //     i++;            
                // });

                // let j = 0;
                // pardavejas.forEach(div => {
                // const {name, address, code, vat, phone, email} = seller;
                // const Seller = Object.values(seller);                   
                //     div.innerText = Seller[j];
                //     j++;            
                // })
                // let k = 1;
                // let afterDiscount;
                // let pvmSuma;
                // let sum;
                // let tarpineSuma = 0;
                // let visoPvm = 0;
                // items.forEach(item => {
                //     const {description, discount, price, quantity} = item;
                //     const Discount = Object.values(discount);
                //     let type = '';
                //     if (Discount[0] === 'percentage') {
                //         type = `${Discount[1]} %`;
                //         afterDiscount = price - ((price / 100) * Discount[1]);
                //     } else if (Discount[0] === 'fixed') {
                //         type = `${Discount[1]} €`;                
                //         afterDiscount = price - Discount[1];
                //     } else {
                //         afterDiscount = price;
                //     };
                //     pvmSuma = (afterDiscount * 0.21) * quantity;
                //     sum = afterDiscount * quantity + pvmSuma;
                //     tarpineSuma += sum;
                //     visoPvm += pvmSuma;
                //     const preke = `<tr>
                //                 <td>00${k}</td>
                //                 <td>${description}</td>
                //                 <td class="right">${quantity}</td>                        
                //                 <td class="right">${price.toFixed(2)}</td>
                //                 <td class="right">${type}</td>                        
                //                 <td class="right">${afterDiscount.toFixed(2)}</td>
                //                 <td class="right">21 %</td>
                //                 <td class="right">${pvmSuma.toFixed(2)}</td>
                //                 <td class="right">${sum.toFixed(2)}</td>
                //             </tr>`
                //         list.innerHTML += preke;
                //         k++;
                // })

                // tarpine.innerText = tarpineSuma.toFixed(2) + ' €';
                // visoPVM.innerText = (visoPvm + (shippingPrice * 0.21)).toFixed(2) + ' €';
                // viso.innerText = (tarpineSuma + shippingPrice).toFixed(2) + ' €';
    

    return (
        <div className="container">
            <h1>PVM sąskaita faktūra</h1>
            <span id="data-nr">Nr:{temp.number}</span>
            <p id="data-dokData">Dok. data: {temp.date}</p>
            <p className="apmoketi" id="data-apmoketi">Apmokėti iki: {temp.due_date}</p>
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
                    <div>{temp.company.seller.name}</div>
                    <div>{temp.company.seller.address}</div>
                    <div>{temp.company.seller.code}</div>
                    <div>{temp.company.seller.vat}</div>
                    <div>{temp.company.seller.phone}</div>
                    <div>{temp.company.seller.email}</div>
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
                    <div>{temp.company.buyer.name}</div>
                    <div>{temp.company.buyer.address}</div>
                    <div>{temp.company.buyer.code}</div>
                    <div>{temp.company.buyer.vat}</div>
                    <div>{temp.company.buyer.phone}</div>
                    <div>{temp.company.buyer.email}</div>
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
                            <div className="data" id="data-pristatymas">{temp.shippingPrice}</div>
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