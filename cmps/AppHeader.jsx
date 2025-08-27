
const { Link } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <Link to="/home"><img className="header-logo" src="./assets/img/missBooksLogo.png" alt="" /></Link>
                <div>
                    <Link className="header-link" to="/home">Home</Link>
                    <Link className="header-link" to="/about">About</Link>
                    <Link className="header-link" to="/books">Books</Link>
                </div>
            </section>
        </header>
    )
}
