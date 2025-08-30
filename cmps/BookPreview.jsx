import { BookDescription } from "./BookDescription.jsx"

const { useState, useEffect, useRef} = React

export function BookPreview({ book }) {

    return (
        <div className='book-preview-container'>
            <h3 className='book-preview-title'>{ book.title }</h3>
            <BookDescription desc={book.description} numOfCharToDisplay={70}/>
            <p className='book-preview-authors'>{ book.authors }</p>
        </div>
    )
}