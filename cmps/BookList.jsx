import { BookPreview } from "../cmps/BookPreview.jsx"

const { useState, useEffect, useRef} = React

export function BookList({ books, blurBackground }) {

    const booksToDisplay = books.map(( book ) => <BookPreview key={book.id} book={ book } blurBackground={blurBackground}/>)

    return (
        <div className='book-list-container'>
            { booksToDisplay }
        </div>
    )
}