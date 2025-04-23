import { useState } from "react";
import axios from 'axios';

export default function Register() {

    const [form, setForm] = useState({
        name: '',
        password: ''
    });
    const [newUser, setNewUser] = useState(null);

    const changeHandler = e => {
        setForm(n => ({
            ...n,
            [e.target.id]: e.target.value
        }));
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    const createUser = _ => {
        if (!form.name || !form.password) {
            setNewUser("Username and password cannot be empty.");
            setTimeout(_ => {
                setNewUser(null);
            }, 2000);
            return;
        };

        axios.post('http://localhost:3001/register', form, { withCredentials: true })
            .then(res => {
                setNewUser('User registered successfully, redirecting...');
                setTimeout(_ => {
                    goHome();
                    setNewUser(null);
                }, 2000);            
            })
            .catch(error => {
                console.error(error);
                console.log(error.data);
                setNewUser('Username already exists');
                setTimeout(_ => {
                    setNewUser(null);
                }, 2000);
                setForm({ name: '', password: '' });
            });
    };

    return (
        <section className="register">
            <h1>Register new account</h1>
            <div className="form">
                <input type="text" placeholder="Username" className="register_input" id="name" value={form.name} onChange={changeHandler} />
                <input type="password" placeholder="Password" className="register_input" id="password" value={form.password} onChange={changeHandler} />
                <button className="button42 lime" onClick={_ => createUser(form)}>Sign up</button>
                <button className="button42 red" onClick={goHome}>Go back</button>
            </div>
            {newUser !== null ? <div className="modal_msg"><h1>{newUser}</h1></div> : null}
        </section>
    );
};