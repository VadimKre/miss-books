import { bookService } from '../services/books.service.js'

import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect, useRef} = React

export function BookIndex(){

    const [booksToDisplay, setBooksToDisplay] = useState([])
    const shadowDivRef = useRef()

    useEffect( () => {

        bookService.query().then(setBooksToDisplay)
        
    }, [])

    function blurBackground(isBackgroundBlurred){
        isBackgroundBlurred ? shadowDivRef.current.style.zIndex = '-99' : shadowDivRef.current.style.zIndex = '2'
 
    }

    return(
        <section className='boox-index-section'>
            <div 
                ref={shadowDivRef} 
                className='book-index-shadow-div'
                onClick={() => blurBackground(true)}
                >
            </div>
            <BookList 
                books={booksToDisplay} 
                blurBackground={blurBackground}/>
        </section>
    )
}