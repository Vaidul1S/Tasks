import List from "./List";

export default function Home() {

    return (
        <section className="home">
            <div className="container">
                <h1 className="home_title">Wellcome to Fundraiser, make someone's day</h1>
                <div className="context">
                    <List />
                </div>
            </div>
        </section>
    );
}