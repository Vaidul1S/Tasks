import logo from './images/03.svg';

export default function Logo() {

    const clearCookies = _ => {
        localStorage.setItem('santa', JSON.stringify(null));
    };

    return (
        <div>
            <h1 className='h1'>Secr<span onDoubleClick={clearCookies}>e</span>t Santa</h1>
            <img src={logo} className="logo react" alt="logo" />
            <img src={logo} className="logo react" alt="logo" />
            <img src={logo} className="logo react" alt="logo" />
        </div>
    )
};