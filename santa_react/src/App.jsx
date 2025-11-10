import reactLogo from './assets/react.svg';
import './App.css';
import './buttons.scss';
import Santa from './assets/Santa';

export default function App() {

  return (
    <>
      <div>        
        <h1>Secret Santa</h1>
          <img src={reactLogo} className="logo react" alt="React logo" />
          <Santa/>
      </div>
      
    </>
  )
};