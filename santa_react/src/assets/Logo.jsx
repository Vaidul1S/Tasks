import logo from './images/03.svg';

export default function Logo() {

    return (
        <div>
            <h1>Secret Santa</h1>
            <img src={logo} className="logo react" alt="logo" />
            <img src={logo} className="logo react" alt="logo" />
            <img src={logo} className="logo react" alt="logo" />
        </div>
    )
};