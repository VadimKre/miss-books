import { BookDescription } from "./BookDescription.jsx"
import { BookDetails } from "../pages/BookDetails.jsx"
import { AddReview } from "./AddReview.jsx"

const { useState, useEffect, useRef} = React

const { Link } = ReactRouterDOM

export function BookPreview({ book, diplayBookDetails }) {

    const [hover, setHover] = useState(false)

    const elTitleRef = useRef()

    useEffect( () => {

        hover ? elTitleRef.current.style.color = 'var(--mb-primary)' : elTitleRef.current.style.color = 'var(--mb-honey)'
    }, [hover])

    return (
    <Link to={`/books/${book.id}`}>
        <div 
            className='book-preview-container'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => diplayBookDetails(book)}>
            <h3 
                ref={elTitleRef} 
                className='book-preview-title'>
                    { book.title }
            </h3>
            <BookDescription 
                className='book-preview-description' 
                desc={book.description} 
                numOfCharToDisplay={130}
            />
            <p className='book-preview-authors'>By: { book.authors }</p>
        </div>
        
    </Link>
    )
}