import logo from './assets/03.svg';
import './App.css';
import './buttons.scss';
import './style.scss';
import Santa from './assets/Santa';
import MakePool from './assets/MakePool';

export default function App() {

  return (
    <>
      <div>        
        <h1>Secret Santa</h1>
          <img src={logo} className="logo react" alt="logo" />
          <img src={logo} className="logo react" alt="logo" />
          <img src={logo} className="logo react" alt="logo" />
          <Santa/>
      </div>

      <MakePool/>
      
    </>
  )
};