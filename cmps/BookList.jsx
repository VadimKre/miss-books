import { BookPreview } from "../cmps/BookPreview.jsx"

const { useState, useEffect, useRef} = React

export function BookList({ books }) {

    console.log(books)

    const booksToDisplay = books.map(( book ) => <BookPreview key={book.id} book={ book }/>)

    return (
        <div className='book-list-container'>
            { booksToDisplay }
        </div>
    )
}