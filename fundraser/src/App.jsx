import { Router } from "./Contexts/Router";
import Wrapper from "./Components/Wrapper";
import Nav from "./Components/Nav";
import './crud.scss';
import Main from "./Components/Main";
import { Auth } from "./Contexts/Auth";

export default function App() {

    return (
        <Router>
            <Auth>
                <Wrapper classname="appa">
                    <Nav />
                    <Main />
                </Wrapper>
            </Auth>
        </Router>
    );
};