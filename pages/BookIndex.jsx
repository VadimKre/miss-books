import { bookService } from '../services/books.service.js'

import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'

const { useState, useEffect, useRef} = React

export function BookIndex(){

    const [booksToDisplay, setBooksToDisplay] = useState([])
    const [bookDetails, setBookDetails] = useState(null)

    const shadowDivRef = useRef()

    useEffect( () => {
        console.log('bookDetails: ', bookDetails)
    }, [bookDetails])

    useEffect( () => {

        bookService.query().then(setBooksToDisplay)
        
    }, [])

    function blurBackground(isBackgroundBlurred){
        isBackgroundBlurred ? shadowDivRef.current.style.zIndex = '-99' : shadowDivRef.current.style.zIndex = '2'
 
    }

    function diplayBookDetails(book){
        blurBackground(false)
        setBookDetails(book)
        console.log('book: ', book)
    }

    

    return(
        <section className='boox-index-section'>
            <div 
                ref={shadowDivRef} 
                className='book-index-shadow-div'
                onClick={() => blurBackground(true)}
                >
            </div>
            {bookDetails && <BookDetails bookDetails={bookDetails}/>}
            <BookList 
                books={booksToDisplay} 
                diplayBookDetails={diplayBookDetails}/>
        </section>
    )
}