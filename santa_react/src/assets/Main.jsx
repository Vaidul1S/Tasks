import { useContext } from "react";
import RouterContext from "./Router";
import Page404 from "./Page404";

export default function Main() {

    const { page, parameters, routes } = useContext(RouterContext);

    const route = _ => {
        return routes?.[page]?.c ?? <Page404/>;
    };    

    return (
        <main>
            {route()}
        </main>
    )
};