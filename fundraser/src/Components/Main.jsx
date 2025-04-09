import { useContext } from "react";
import RouterContext from "./Router";

export default function Main() {

    const { page, parameters, routes } = useContext(RouterContext);
    console.log('maino parametrai atnaujinti', parameters);

    const route = _ => {

        return routes?.[page]?.c ?? <h1>404</h1>;
    };

    return (
        <main>
            {route()}
        </main>
    );
}