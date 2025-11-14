import logo from './assets/images/03.svg';
import './App.css';
import './buttons.scss';
import './style.scss';
import { Router } from './assets/Rouer';
import Wraper from './assets/Wraper';
import Nav from './assets/Nav';
import Main from './assets/Main';

export default function App() {

  return (
    <>
      <div>
        <h1>Secret Santa</h1>
        <img src={logo} className="logo react" alt="logo" />
        <img src={logo} className="logo react" alt="logo" />
        <img src={logo} className="logo react" alt="logo" />
      </div>
      <Router>
        <Wraper>
          <Nav />
          <Main />
        </Wraper>
      </Router>      

    </>
  )
};