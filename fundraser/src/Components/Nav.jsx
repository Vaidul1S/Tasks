import { useContext } from "react";
import Link from "./Link";
import RouterContext from "../Contexts/Router";
import AuthContext from "../Contexts/Auth";

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
                            <li><Link to="redirect">Start a Fundraising</Link></li>
                            : <li><Link to="create">Start a Fundraising</Link></li>
                        }
                        <li><Link to="about">How It Works</Link></li>
                        <li><Link to="contact">Contact</Link></li>
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
                                {user.role === 'admin' ?
                                    <div className="auth">
                                        <Link to="admin">Admin Panel</Link>
                                    </div>
                                    : null}
                                <Link to="logout">Logout</Link>
                            </div>
                            : null
                    }
                </nav>
            </div>
        </section>
    );
};