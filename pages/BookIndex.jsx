import { bookService } from '../services/books.service.js'

import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect, useRef} = React

export function BookIndex(){

    const [booksToDisplay, setBooksToDisplay] = useState([])

    useEffect( () => {

        bookService.query().then(setBooksToDisplay)
        
    }, [])


    return(
        <section className='boox-index-section'>
            <BookList books={booksToDisplay}/>
        </section>
    )
}