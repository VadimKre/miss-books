import { gbooksService } from '../services/gbooks.service.js'
import { bookService } from '../services/books.service.js'

const { useEffect, useRef, useState } = React

export function BookAdd() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [addedIds, setAddedIds] = useState(new Set())

    const timerRef = useRef(null)

    useEffect(() => {
        if (!query.trim()) {
            setResults([])
            setError('')
            if (timerRef.current) clearTimeout(timerRef.current)
            return
        }

        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            doSearch(query.trim())
        }, 500)

        return () => timerRef.current && clearTimeout(timerRef.current)
    }, [query])

    async function doSearch(term) {
        try {
            setIsLoading(true)
            setError('')
            const items = await gbooksService.searchBooks(term)
            setResults(items)
        } catch (err) {
            setError('Could not fetch books. Try again.')
        } finally {
            setIsLoading(false)
        }
    }

    async function onAdd(item) {
        try {
            const book = gbooksService.mapToLocalBook(item)
            await bookService.save(book)
            setAddedIds(prev => new Set(prev).add(item.id))
        } catch (err) {
            console.error('Failed adding book:', err)
            setError('Failed to add the book')
        }
    }

    return (
        <section className="book-add">
            <h3>Add a Book from Google</h3>

            <input
                className="book-add-input"
                type="text"
                placeholder="Search Google Books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {isLoading && <p className="book-add-status">Searching…</p>}
            {error && <p className="book-add-error">{error}</p>}

            {!!results.length && (
                <ul className="book-add-results">
                    {results.map(item => {
                        const vi = item.volumeInfo || {}
                        const title = vi.title || 'Untitled'
                        const authors = (vi.authors || []).join(', ')
                        const thumb = (vi.imageLinks && (vi.imageLinks.smallThumbnail || vi.imageLinks.thumbnail)) || 'assets/img/default.png'
                        const isAdded = addedIds.has(item.id)

                        return (
                            <li key={item.id} className="book-add-result">
                                <img className="book-add-thumb" src={thumb} alt={title} />
                                <div className="book-add-meta">
                                    <div className="book-add-title">{title}</div>
                                    <div className="book-add-authors">{authors}</div>
                                </div>
                                <button
                                    className="book-add-btn"
                                    onClick={() => onAdd(item)}
                                    disabled={isAdded}
                                    title={isAdded ? 'Already added' : 'Add to your library'}
                                >
                                    {isAdded ? 'Added' : 'Add'}
                                </button>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

