import { Router } from "./Components/Router";
import Wrapper from "./Components/Wrapper";
import Nav from "./Components/Nav";
import './crud.scss';

export default function App() {

    return (
        <Router>
            <Wrapper>
                <Nav />
            </Wrapper>
        </Router>
    );
};