import List from "./List";

export default function Home() {

    return (
        <section className="home">
            <div className="container">
                <h1>Wellcome to Fundraser</h1>
                <div className="context">
                    <List />
                </div>
            </div>
        </section>
    );
}