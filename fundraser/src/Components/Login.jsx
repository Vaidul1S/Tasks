import { useContext, useState } from "react";
import axios from 'axios';
import AuthContext from "./Auth";

export default function Login() {

    const [form, setForm] = useState({
        name: '',
        password: ''
    });

    const { setUser } = useContext(AuthContext);

    const changeHandler = e => {
        setForm(f => ({
            ...f,
            [e.target.id]: e.target.value
        }));
    };

    const redirectAfterLogin = _ => {
        window.location.hash = '#';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', form)
            .then(res => {
                setUser(res.data.user);
                redirectAfterLogin();                
            })
            .catch(err => alert('Login failed'));
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    return (
        <section className="login">
            <h2>Login</h2>
            <div className="login_form">
                <input type="text" placeholder="Username" className="login_input" value={form.name} onChange={changeHandler}/>
                <input type="password" placeholder="Password" className="login_input" value={form.password} onChange={changeHandler}/>
                <button className="button42 lime">Login</button>
                <button className="button42 red" onClick={goHome}>Cancel</button>
            </div>
        </section>
    );
};