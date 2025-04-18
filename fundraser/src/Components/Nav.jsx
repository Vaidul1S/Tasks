import { useContext } from "react";
import Link from "./Link";
import RouterContext from "./Router";
import AuthContext from "./Auth";

export default function Nav() {

    const { page, routes } = useContext(RouterContext);
    const { user } = useContext(AuthContext);

    if (routes[page]?.hideNav) {
        return null;
    };

    return (
        <section className="nav">
            <div className="container">
                <nav>
                    <ul>
                        <li><img src="" alt="" /></li>
                        <li><Link to="">Home</Link></li>
                        {user !== null && user.role === 'guest' ?
                            <li><Link to="redirect">Create Fundraising</Link></li>
                            : <li><Link to="create">Create Fundraising</Link></li>
                        }
                        <li><Link to="about">About</Link></li>
                        <li><Link to="contact">Contact</Link></li>
                        {user !== null && user.role === 'admin' ?
                            <li><Link to="admin">Admin Panel</Link></li> : null
                        }
                    </ul>
                    {
                        user !== null && user.role === 'guest' ?
                            <div className="auth">
                                <Link to="login">Login</Link>
                                <Link to="register">Register</Link>
                            </div>
                            : null
                    }
                    {
                        user !== null && user.role !== 'guest' ?
                            <div className="auth user">
                                <h3>{user.name}</h3>
                                <Link to="logout">Logout</Link>
                            </div>
                            : null
                    }
                </nav>
            </div>
        </section>
    );
};