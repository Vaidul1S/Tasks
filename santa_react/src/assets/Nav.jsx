import Link from "./Link";

export default function Nav() {

    return (
        <nav className="top-menu">
            <ul>
                <li><Link href="santa">Santa</Link></li>
                <li><Link href="makePool">Make Pool</Link></li>
            </ul>
        </nav>
    )
};