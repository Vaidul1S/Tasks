import { Router } from "./Components/Router";
import Wrapper from "./Components/Wrapper";
import Nav from "./Components/Nav";
import './crud.scss';
import Main from "./Components/Main";
import { Auth } from "./Components/Auth";

export default function App() {

    return (
        <Router>
            <Auth>
                <Wrapper>
                    <Nav />
                    <Main />
                </Wrapper>
            </Auth>
        </Router>
    );
};