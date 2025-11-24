import { useEffect, useState, createContext } from 'react';
import Wraper from "./Wraper";
import Page404 from "./Page404";
import Home from "./Home";
import Santa from "./Santa";
import MakePool from "./MakePool";

const RouterContext = createContext();

export const Router = ({ children }) => {

    const showComponentList = { error404: <Page404 /> };
    
        const routes = {
            '': {c: <Home />, title: 'Home', params: 0},
            'santa': {c: <Santa />, title: 'Santa', params: 0},
            'makePool': {c: <MakePool/>, title: 'MakePool', params: 0},
        };
    
        const [page, setPage] = useState(_ => {
            let hash = window.location.hash.replace('#', '');
            hash = hash.split('/').shift();
            return hash;
        });
        const [parameters, setParameters] = useState(_ => {
            let hash = window.location.hash.replace('#', '');
            hash = hash.split('/').shift();
            return hash;
        });
    
        const [showComponent, setShowComponent] = useState(null);
    
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
        },[parameters, page])
    
        return (
            <RouterContext.Provider value={{
                page, 
                parameters, 
                setShowComponent, 
                routes 
                }}>
                {showComponent === null ? children : <Wraper>{showComponentList[showComponent] ?? null}</Wraper>}
            </RouterContext.Provider>
        );
    }
    
    export default RouterContext;