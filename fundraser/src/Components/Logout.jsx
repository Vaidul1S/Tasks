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
                setTimeout(() => {
                    setUser(res.data);
                    redirectAfterLogout();
                }, 2000);
            })
            .catch(error => {
                console.error(error);
            })
    }, [setUser]);

    return (
        <div className="screen-message"><h2>We hope you had good time. Login out...</h2></div>
    );
};