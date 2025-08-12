import { useContext, useState } from "react";
import axios from 'axios';
import AuthContext from "./Auth";

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
    const { setUser } = useContext(AuthContext);

    const logingIn = (e) => {
        if (!form.name || !form.password) {
            setLoginUser("Please fill all fields.");
            setTimeout(_ => setLoginUser(null), 3000);
            return;
        };

        axios.post('http://localhost:3001/login', form, { withCredentials: true })
            .then(res => {
                setLoginUser(`${form.name} loged in successfully, redirecting...`);
                setTimeout(() => {
                    redirectAfterLogin();
                    setLoginUser(null);
                    setUser(res.data.user);
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                setLoginUser('User not found, check your spelling.');
                setTimeout(_ => {
                    setLoginUser(null);
                }, 3000);
                setForm({ name: '', password: '' });
            });
    };

    const goHome = _ => {
        window.location.hash = '#';
    };

    return (
        <>
            {loginUser !== null ? <div className="screen-message"><h2>{loginUser}</h2></div> :
                <section className="login">
                    <h1>Login</h1>
                    <div className="form">
                        <input type="text" placeholder="Username" className="login_input" id="name" value={form.name} onChange={changeHandler} />
                        <input type="password" placeholder="Password" className="login_input" id="password" value={form.password} onChange={changeHandler} />
                        <div>
                            <button className="button42 tang" onClick={_ => logingIn(form)}>Login</button>
                            <button className="button42 tang" onClick={goHome}>Go back</button>
                        </div>
                    </div>
                </section>
            }
        </>

    );
};