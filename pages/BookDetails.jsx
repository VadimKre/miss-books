const { useParams, useNavigate } = ReactRouterDOM

const { useEffect, useState, useRef } = React

// import { useRef } from 'react'
import { bookService } from '../services/books.service.js'

export function BookDetails({ bookDetails }){

    const { bookId, nextBookID, prevBookID } = useParams()
    const navigate = useNavigate()

    const [bookToDisplay, setBooksToDisplay] = useState(null)

    const bookPriceRef = useRef()

    useEffect ( () => {
        bookService.get(bookId).then((book) => setBooksToDisplay(book))
    }, [])


    function onClickPrev(){
        console.log('nextBookID: ', nextBookID)
    }

    function onClickNext(){
        console.log('prevBookID: ', prevBookID)
    }
    

    if (bookToDisplay){
        // console.log('book.title: ', bookToDisplay)
        const {
            id,
            title,
            subtitle,
            authors = [],
            categories = [],
            description,
            language,
            listPrice = {},
            pageCount,
            publishedDate,
            thumbnail
        } = bookToDisplay

        let pageText = ''

        if (pageCount > 500){
            pageText = 'Serious Reading'
        } 

        else if (pageCount > 200){
            pageText = 'Descent Reading'
        }

        else if (pageCount < 100){
            pageText = 'Light Reading'
        }

        let dateText = ''


        if (new Date().getFullYear() - publishedDate > 10){
            dateText = 'Vintage'
        } 

        else if (new Date().getFullYear() - publishedDate < 1){
            dateText = 'New'
        } 


            return(
        
            <section className='book-details-section'>
                <h3>Title</h3>
                <p>{title}</p>

                <h3>Subtitle</h3>
                <p>{subtitle}</p>

                <h3>Authors</h3>
                <p>{authors.length ? authors.join(', ') : '—'}</p>

                <h3>Categories</h3>
                <p>{categories.length ? categories.join(', ') : '—'}</p>

                <h3>Description</h3>
                <p>{description}</p>

                <h3>Language</h3>
                <p>{language}</p>

                <h3>Page Count</h3>
                <p>{pageCount + ' - ' +  pageText}</p>

                <h3>Published</h3>
                <p>{publishedDate + ' - ' + dateText}</p>

                <h3>List Price</h3>
                <p className={ 
                    listPrice.amount > 150
                        ? 'red'
                        : listPrice.amount < 20
                        ? 'green'
                        : ''
                }>
                    {listPrice.amount}
                </p>

                <div className='book-details-buttons-container'>
                    <button className='book-details-button-prev' onClick={onClickPrev}>Previous</button>
                    <button className='book-details-button-next' onClick={onClickNext}>Next</button>
                </div>
            </section>
    
    )}
}