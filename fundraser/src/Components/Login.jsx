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

    const [loginUser, setLoginUser] = useState(null);

    const logingIn = (e) => {
        if (!form.name || !form.password) {
            setLoginUser("Username and password cannot be empty.");
            setTimeout(_ => {
                setLoginUser(null);
            }, 2000);
            return;
        };

        axios.post('http://localhost:3001/login', form)
            .then(res => {
                setLoginUser('User loged in successfully, redirecting...');
                setTimeout(() => {
                    redirectAfterLogin();
                    setLoginUser(null);
                }, 2000);
            })
            .catch(error => {
                console.error(error);
                console.log(error.data);
                setLoginUser('User not found');
                setTimeout(_ => {
                    setLoginUser(null);
                }, 2000);
                setForm({ name: '', password: '' });
            });
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    return (
        <section className="login">
            <h2>Login</h2>
            <div className="login_form">
                <input type="text" placeholder="Username" className="login_input" id="name" value={form.name} onChange={changeHandler} />
                <input type="password" placeholder="Password" className="login_input" id="password" value={form.password} onChange={changeHandler} />
                <button className="button42 lime" onClick={_ => logingIn(form)}>Login</button>
                <button className="button42 red" onClick={goHome}>Cancel</button>
            </div>
            {loginUser !== null ? <div className="modal_msg"><h1>{loginUser}</h1></div> : null}
        </section>
    );
};