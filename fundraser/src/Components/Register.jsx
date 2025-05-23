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
            }, 5000);
            return;
        };

        axios.post('http://localhost:3001/register', form, { withCredentials: true })
            .then(res => {
                setNewUser('User registered successfully, redirecting...');
                setTimeout(_ => {
                    goHome();
                    setNewUser(null);
                }, 5000);
            })
            .catch(error => {
                console.error(error);
                console.log(error.data);
                setNewUser('Username already exists');
                setTimeout(_ => {
                    setNewUser(null);
                }, 5000);
                setForm({ name: '', password: '' });
            });
    };

    return (
        <>
            <section className="register">
                <h1>Register new account</h1>
                <div className="form">
                    <input type="text" placeholder="Username" className="register_input" id="name" value={form.name} onChange={changeHandler} />
                    <input type="password" placeholder="Password" className="register_input" id="password" value={form.password} onChange={changeHandler} />
                    <div>
                        <button className="button42 tang" onClick={_ => createUser(form)}>Sign up</button>
                        <button className="button42 tang" onClick={goHome}>Go back</button>
                    </div>
                </div>
            </section>
            {newUser !== null ? <div className="modal_msg"><h2>{newUser}</h2></div> : null}
        </>

    );
};