import List from "./List";

export default function Home() {

    return (
        <section className="home">
            <div className="container">
                <h1 className="home_title">A Smallest Care Can Change the Someone's World</h1>
                <div className="context">
                    <List />
                </div>
            </div>
        </section>
    );
}