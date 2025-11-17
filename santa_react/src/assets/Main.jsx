import { useContext } from "react";
import RouterContext from "./Router";
import Santa from "./Santa";
import MakePool from "./MakePool";
import Home from "./Home";

export default function Main() {

    const { page, parameters, setShowComponent } = useContext(RouterContext);

    const routes = {
        santa: { c: <Santa />, title: 'Santa', params: 0 },
        makePool: { c: <MakePool />, title: 'MakePool', params: 0 },
        '': { c: <Home />, title: 'Home', params: 0 },
    };

    const route = _ => {
        if (routes[page] === undefined) {
            setShowComponent('error404');
            return null;
        }
        if (parameters.length !== routes[page].params) {
            setShowComponent('error404');
            return null;
        }
        if (routes[page].validParams !== undefined) {
            for (let i = 0; i < routes[page].params; i++) {
                if (!routes[page].validParams[i].includes(parameters[i])) {
                    setShowComponent('error404');
                    return null;
                }
            }
        }
        return routes[page].c;
    };

    return (
        <main>
            {route()}
        </main>
    )
};