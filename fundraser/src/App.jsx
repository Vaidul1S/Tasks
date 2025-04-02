import { Router } from "./Components/Router";
import Wrapper from "./Components/Wrapper";
import Nav from "./Components/Nav";
import './crud.scss';
import Main from "./Components/Main";

export default function App() {

    return (
        <Router>
            <Wrapper>
                <Nav />
                <Main />
            </Wrapper>
        </Router>
    );
};