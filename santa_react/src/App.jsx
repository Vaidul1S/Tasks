import './App.css';
import './buttons.scss';
import './style.scss';
import { Router } from './assets/Router';
import Wraper from './assets/Wraper';
import Nav from './assets/Nav';
import Main from './assets/Main';
import Logo from './assets/Logo';

export default function App() {

  return (
    <>


      <Router>
        <Wraper>
          <Nav />
          <Logo />
          <Main />
        </Wraper>
      </Router>

    </>
  )
};