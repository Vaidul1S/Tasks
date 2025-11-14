import { useEffect, useState, createContext } from 'react';
import Wraper from "./Wraper";
import Page404 from "./Page404";
const RouterContext = createContext();

export const Router = ({ children }) => {

    const [page, setPage] = useState(_ => {
        let hash = window.location.hash.replace('#', '');
        hash = hash.split('/').shift();
        return hash
    });
    const [parameters, setParameters] = useState(_ => {
        let hash = window.location.hash.replace('#', '');
        hash = hash.split('/').shift();
        return hash
    });

    const [showComponent, setShowComponent] = useState(null);

    const showComponentList = { error404: <Page404 /> }

    useEffect(_ => {
        window.addEventListener('hashchange', _ => {
            let hash = window.location.hash.replace('#', '');
            hash = hash.split('/');
            setPage(hash.shift());
            setParameters(hash);
        });
    }, []);

    useEffect(_ => {
        setShowComponent(null);
    }, [parameters, page])

    useEffect(_ => {
        console.log('hash', page);

    }, [page]);

    return (
        <RouterContext.Provider value={{ page, parameters, setShowComponent }}>
            {showComponent === null ? children : <Wraper>{showComponentList[showComponent] ?? null}</Wraper>}
        </RouterContext.Provider>
    )
};

export default RouterContext;