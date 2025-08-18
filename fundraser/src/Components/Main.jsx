import { useContext } from "react";
import RouterContext from "../Contexts/Router";
import Page404 from "./Page404";

export default function Main() {

    const { page, parameters, routes } = useContext(RouterContext);
    console.log('maino parametrai atnaujinti', parameters);

    const route = _ => {

        return routes?.[page]?.c ?? <Page404/>;
    };

    return (
        <main>
            {route()}
        </main>
    );
}