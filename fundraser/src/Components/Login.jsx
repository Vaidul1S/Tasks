import { useState } from "react";
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login', { username, password })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                alert('Login successful');                
            })
            .catch(err => alert('Login failed'));
    };

    return (
        <section className="login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" placeholder="Username" className="p-2 border" value={username} onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" className="p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
            </form>
        </section>
    );
};