import { useState } from "react";
import axios from 'axios';

export default function Register() {

    const [newUser, setNewUser] = useState({
        name: '',
        password: ''
    });

    const changeHandler = e => {
        setNewUser(n => ({
            ...n,
            [e.target.id]: e.target.value
        }));
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    const createUser = _ => {
        axios.post('http://localhost:3001/register', newUser, { withCredentials: true })
            .then(res => {
                
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <section className="register">
            <h2>Register new account</h2>
            <div className="register_form">
                <input type="text" placeholder="Username" className="register_input" id="name" value={newUser.name} onChange={changeHandler} />
                <input type="password" placeholder="Password" className="register_input" id="password" value={newUser.password} onChange={changeHandler} />
                <button className="button42 lime" onClick={_ => createUser(newUser)}>Sign up</button>
                <button className="button42 red" onClick={goHome}>Go back</button>
            </div>
        </section>
    );
};