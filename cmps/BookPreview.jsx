import { BookDescription } from "./BookDescription.jsx"

const { useState, useEffect, useRef} = React

export function BookPreview({ book }) {

    const [hover, setHover] = useState(false)

    const elTitleRef = useRef()

    useEffect( () => {

        hover ? elTitleRef.current.style.color = 'var(--mb-primary)' : elTitleRef.current.style.color = 'var(--mb-honey)'
    }, [hover])

    return (
        <div 
            className='book-preview-container'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <h3 
                ref={elTitleRef} 
                className='book-preview-title'>
                    { book.title }
            </h3>
            <BookDescription 
                className='book-preview-description' 
                desc={book.description} 
                numOfCharToDisplay={110}
            />
            <p className='book-preview-authors'>By: { book.authors }</p>
        </div>
    )
}