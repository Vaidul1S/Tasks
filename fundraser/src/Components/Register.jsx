import { useState } from "react";
import axios from 'axios';

export default function Register() {

    const [newUser, setNewUser] = useState({
        name: '',
        password: ''
    });

    const changeHandler = e => {
        setNewUser(n => ({   
                     
            [e.target.id]: e.target.value
        }));
    };
    
    const goHome = _ => {
        window.location.hash = '#';
    };

    const createUser = _ => {
        console.log(newUser);
        
    };

    return (
        <section className="register">
            <h2>Register new account</h2>
            <div className="register_form">
                <input type="text" placeholder="Username" className="register_input" value={newUser.name} onChange={changeHandler} />
                <input type="password" placeholder="Password" className="register_input" value={newUser.password} onChange={changeHandler} />
                <button className="button42 lime" onClick={_=> createUser(newUser)}>Sign up</button>
                <button className="button42 red" onClick={goHome}>Go back</button>
            </div>
        </section>
    );
};