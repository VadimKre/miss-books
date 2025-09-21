import { BookPreview } from "../cmps/BookPreview.jsx"

const { useState, useEffect, useRef} = React

export function BookList({ books, diplayBookDetails }) {

    const booksToDisplay = books.map(( book, i) => 
        <BookPreview 
            key={book.id} 
            book={book} 
            nextBookID={books[i+1].id}  
            prevBookID={books[i-1].id} 
            diplayBookDetails={diplayBookDetails}
        />)

    return (
        <div className='book-list-container'>
            { booksToDisplay }
        </div>
    )
}