
import { AppHeader } from "./cmps/AppHeader.jsx"
import { HomePage } from "./pages/HomePage.jsx"
import { AboutUs } from "./pages/AboutUs.jsx"
import { BookIndex } from "./pages/BookIndex.jsx"
import { BookDetails } from "./pages/BookDetails.jsx"


const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


export function RootCmp() {
    return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Navigate to="/home"/>}/>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/books" element={<BookIndex />}/>
                        <Route path="/books/:bookId" element={<BookDetails />}/>
                    </Routes>

                    
                </main>
            </section>
        </Router>
    )
}