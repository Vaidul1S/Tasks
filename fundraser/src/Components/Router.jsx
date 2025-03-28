import { useEffect, useState, createContext } from 'react';
import Wraper from '../Components/Wraper';
import Page404 from '../Components/Page404';
import Home from "../Pages/Home";
import Login from '../Pages/Login';
import Logout from '../Pages/Logout';

const RouterContext = createContext();

export const Router = ({ children }) => {

    const showComponentList = { error404: <Page404 /> };

    const routes = {
        '': {c: <Home />, title: 'Home', params: 0},
        'home': {c: <Home />, title: 'Home', params: 0},
        'login': {c: <Login />, title: 'Login', params: 0, hideNav: true},
        'logout': {c: <Logout/>, title: 'Logout', params: 0, hideNav: true},
        'register': {c: null, title: 'Register', params: 0, hideNav: true},
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