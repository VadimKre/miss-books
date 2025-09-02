import { BookPreview } from "../cmps/BookPreview.jsx"

const { useState, useEffect, useRef} = React

export function BookList({ books, diplayBookDetails }) {

    const booksToDisplay = books.map(( book ) => <BookPreview key={book.id} book={ book } diplayBookDetails={diplayBookDetails}/>)

    return (
        <div className='book-list-container'>
            { booksToDisplay }
        </div>
    )
}