import { useEffect, useState, createContext } from 'react';
import Wrapper from '../Components/Wrapper';
import Page404 from '../Pages/Page404';
import Home from "../Pages/Home";
import About from '../Pages/About';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Logout from '../Pages/Logout';
import Create from '../Pages/Create';
import Admin from '../Pages/Admin';
import Redirect from '../Components/Redirect';

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