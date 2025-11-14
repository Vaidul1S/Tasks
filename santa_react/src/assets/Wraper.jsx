export default function Wraper({children}) {
    return (
        <div className="app">
                <header className="app-header">
                    {children}
                </header>
            </div>
    )
}