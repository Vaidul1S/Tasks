import Link from "./Link";

export default function Nav() {

    return (
        <nav className="top-menu">
            <ul>
                <li><Link href="">Home</Link></li>
                <li><Link href="santa">Secret Santa</Link></li>
                <li><Link href="makePool">Make Family Pool</Link></li>
            </ul>
        </nav>
    )
};