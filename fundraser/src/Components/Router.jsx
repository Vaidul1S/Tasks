import { useEffect, useState, createContext } from 'react';
import Wrapper from './Wrapper';
import Page404 from './Page404';
import Home from "./Home";
import About from './About';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Create from './Create';
import Admin from './Admin';
import Redirect from './Redirect';

const RouterContext = createContext();

export const Router = ({ children }) => {

    const showComponentList = { error404: <Page404 /> };

    const routes = {
        '': {c: <Home />, title: 'Home', params: 0},
        'home': {c: <Home />, title: 'Home', params: 0},
        'about': {c: <About />, title: 'About', params: 0},
        'login': {c: <Login />, title: 'Login', params: 0, hideNav: true},
        'logout': {c: <Logout/>, title: 'Logout', params: 0, hideNav: true},
        'register': {c: <Register />, title: 'Register', params: 0, hideNav: true},
        'create': {c: <Create />, title: 'Create', params: 0},
        'admin': {c: <Admin />, title: 'Admin', params: 0},
        'redirect': {c: <Redirect />, title: 'Redirect', params: 0, hideNav: true},
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
            {showComponent === null ? children : <Wrapper>{showComponentList[showComponent] ?? null}</Wrapper>}
        </RouterContext.Provider>
    );
}

export default RouterContext;