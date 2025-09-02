import { bookService } from '../services/books.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'

const { useState, useEffect, useRef} = React

const { Link } = ReactRouterDOM

export function BookIndex(){

    const [booksToDisplay, setBooksToDisplay] = useState([])
    const [bookDetails, setBookDetails] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    const shadowDivRef = useRef()

    console.log('booksToDisplay: ', booksToDisplay)


    useEffect( () => {
        loadBooks()
    }, [])

    useEffect( () => {

        loadBooks()
        
    }, [filterBy])


    function loadBooks() {
        bookService.query(filterBy).then(setBooksToDisplay)
    }

    function blurBackground(isBackgroundBlurred){
        isBackgroundBlurred ? shadowDivRef.current.style.zIndex = '-99' : shadowDivRef.current.style.zIndex = '2'
    }

    function diplayBookDetails(book){
        blurBackground(false)
        setBookDetails(book)
        
        console.log('book: ', book)
    }

    function onSetFilterBy(filterBy) {
        console.log('filterBy: ', filterBy)
        setFilterBy(prev => ({ ...prev, ...filterBy}))
    }

    return(
        <section className='boox-index-section'>

            <div 
                ref={shadowDivRef} 
                className='book-index-shadow-div'
                onClick={() => blurBackground(true)}
                >
            </div>
            <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy}/>

            {/* {bookDetails && <BookDetails bookDetails={bookDetails}/>} */}
            <BookList 
                books={booksToDisplay} 
                diplayBookDetails={diplayBookDetails}/>
        </section>
    )
}