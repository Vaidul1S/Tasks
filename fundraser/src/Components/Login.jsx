import { useState } from "react";
import axios from 'axios';

export default function Login() {

    const [form, setForm] = useState({
        name: '',
        password: ''
    });

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
        axios.post('http://localhost:3000/login', loginData)
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="login_input" value={form.name} onChange={changeHandler}/>
                <input type="password" placeholder="Password" className="login_input" value={form.password} onChange={changeHandler}/>
                <button className="button42 lime">Login</button>
                <button className="button42 red" onClick={goHome}>Cancel</button>
            </form>
        </section>
    );
};