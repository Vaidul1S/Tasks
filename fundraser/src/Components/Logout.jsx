import { useContext, useEffect } from "react";
import AuthContext from "./Auth";
import axios from "axios";

export default function Logout() {

    const { setUser } = useContext(AuthContext);

    const redirectAfterLogout = _ => {
        window.location.hash = '#';
    };

    useEffect(_ => {
        axios.post('http://localhost:3001/logout', {}, { withCredentials: true })
            .then(res => {
                setUser(res.data);
                redirectAfterLogout();
            })
            .catch(error => {
                console.error(error);
            })
    }, []);

    return (
        <h2 className="screen-message">Login out...</h2>
    );
};