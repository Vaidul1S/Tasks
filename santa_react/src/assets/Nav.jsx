import Link from "./Link";

export default function Nav() {

    return (
        <nav className="top-menu">
            <ul>
                <li><Link href="">Home</Link></li>
                <li><Link href="shop">Make Pool</Link></li>                
            </ul>
        </nav>
    )
}