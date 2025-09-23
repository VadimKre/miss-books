const { useParams, useNavigate } = ReactRouterDOM

const { useEffect, useState, useRef } = React

// import { useRef } from 'react'
import { bookService } from '../services/books.service.js'

import { AddReview } from '../cmps/AddReview.jsx'

export function BookDetails({ bookDetails }){

    const { bookId } = useParams()
    const navigate = useNavigate()

    const [bookToDisplay, setBooksToDisplay] = useState(null)
    const [nextBookId, setNextBookId] = useState(null)
    const [prevBookId, setPrevBookId] = useState(null)
    const [isAddReviewOpen, setIsAddReviewOpen] = useState(false)

    const bookPriceRef = useRef()

    useEffect ( () => {
        let isCancelled = false

        setBooksToDisplay(null)
        setNextBookId(null)
        setPrevBookId(null)

        bookService.get(bookId).then((book) => {
            if (!isCancelled) setBooksToDisplay(book)
        })

        bookService.getNextBookId(bookId).then((id) => {
            if (!isCancelled) setNextBookId(id)
        })

        bookService.getPrevBookId(bookId).then((id) => {
            if (!isCancelled) setPrevBookId(id)
        })

        return () => {
            isCancelled = true
        }
    }, [bookId])


    function onClickPrev(){
        if (!prevBookId) return
        navigate(`/books/${prevBookId}`)
    }

    function onClickNext(){
        if (!nextBookId) return
        navigate(`/books/${nextBookId}`)
    }
    
    function openAddReview(){
        setIsAddReviewOpen(true)
    }
    function closeAddReview(){
        setIsAddReviewOpen(false)
    }

    function refreshBook(){
        bookService.get(bookId).then(setBooksToDisplay)
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
            thumbnail,
            reviews,
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
                <div className='book-details-buttons-container'>
                    <button className='book-details-button-prev' onClick={onClickPrev} disabled={!prevBookId}>Previous</button>
                    <button className='book-details-button-next' onClick={onClickNext} disabled={!nextBookId}>Next</button>
                </div>
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

                <div>
                    <button onClick={openAddReview}>Add Review</button>
                </div>

                {reviews && (
                    <div className='book-details-reviews-container'>
                        {reviews.map((review, idx) => {
                            return (
                                <div key={id + '_rev_' + idx} className='review-container'>
                                    <div className='review-header'>
                                        <p className='review-name'>{review.name}</p>
                                        <p className='review-date'>{review.date}</p>
                                    </div>
                                    <div className='review-stars'>
                                        {[1,2,3,4,5].map(star => (
                                            <span key={star} className={'review-star ' + (star <= review.rating ? 'is-filled' : '')}>☆</span>
                                        ))}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {isAddReviewOpen && (
                    <div>
                        <div className='book-details-overlay' onClick={closeAddReview}></div>
                        <div className='book-details-modal'>
                            <button className='book-details-modal-close' onClick={closeAddReview}>×</button>
                            <AddReview bookID={bookId} onSubmitted={() => { refreshBook(); closeAddReview() }} />
                        </div>
                    </div>
                )}
            </section>

    )}
}
