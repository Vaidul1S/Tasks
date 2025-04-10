import { useState } from "react";
import axios from 'axios';

export default function Register() {

    const [form, setform] = useState({
        name: '',
        password: ''
    });
    const [newUser, setNewUser] = useState(null);

    const changeHandler = e => {
        setform(n => ({
            ...n,
            [e.target.id]: e.target.value
        }));
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    const createUser = _ => {
        if (!form.name || !form.password) {
            alert("Username and password cannot be empty.");
            return;
        };
        
        axios.post('http://localhost:3001/register', form, { withCredentials: true })
            .then(res => {
                console.log(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <section className="register">
            <h2>Register new account</h2>
            <div className="register_form">
                <input type="text" placeholder="Username" className="register_input" id="name" value={form.name} onChange={changeHandler} />
                <input type="password" placeholder="Password" className="register_input" id="password" value={form.password} onChange={changeHandler} />
                <button className="button42 lime" onClick={_ => createUser(form)}>Sign up</button>
                <button className="button42 red" onClick={goHome}>Go back</button>
            </div>
        </section>
    );
};