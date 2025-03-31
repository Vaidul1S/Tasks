import { Router } from "./Components/Router";
import Wrapper from "./Components/Wrapper";
import Nav from "./Components/Nav";

export default function App() {

    return (
        <Router>
            <Wrapper>
                <Nav />
            </Wrapper>
        </Router>
    );
};