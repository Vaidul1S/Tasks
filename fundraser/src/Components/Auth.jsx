import { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const Auth = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect(_ => {
        axios.get('http://localhost:3001/users', { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(error => {
                console.error(error);
            })
    },[]);

    return (
        <AuthContext.Provider value={{
            user,
            setUser
        }}>
            {user === null ? <h2 className="screen-message">Logging in...</h2> : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
