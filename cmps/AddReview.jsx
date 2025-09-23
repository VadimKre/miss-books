import { bookService } from '../services/books.service.js'

const { useState, useEffect, useRef } = React


export function AddReview({ bookID, onSubmitted }) {

    const [rating, setRating] = useState(null)
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [name, setName] = useState(null)
    const [date, setDate] = useState(null)

    const starRefs = useRef([])

    useEffect( () => {
        unColorStars(5)
        colorStars(rating)
    }, [rating])


    useEffect( () => {


        if (name && date && rating){
            setSubmitDisabled(false)
        }
        else{
            setSubmitDisabled(true)
        }
    }, [rating, date, name])

    function handleMouseEnter(ratingNum) {
        unColorStars(5)
        colorStars(ratingNum)
    }

    function handleMouseLeave(ratingNum) {
        unColorStars(5)
        if (rating) {
            colorStars(rating)
        }
    }

    function colorStars(rating) {
        for (let i=0; i<rating; i++){
            starRefs.current[i].classList.toggle('is-filled', true)
        }
    }

    function unColorStars(rating){
        for (let i=0; i<rating; i++){
            starRefs.current[i].classList.toggle('is-filled', false)
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        bookService.addReview(bookID, {name: name, date: date, rating: rating})
        .then(() => {
            if (typeof onSubmitted === 'function') onSubmitted()
        })
    }

    return(
        <div className='add-review-container'>
            <p className='add-review-help'>Fill your name, choose when you read it, and click a star rating. You can hover the stars to preview the rating before clicking.</p>
            <form action="submit">
                <input type="text" placeholder='Full Name' onChange={(e) => setName(e.target.value)}/>

                <div className='add-review-stars-container'>
                    <div ref={el => starRefs.current[0] = el} onClick={() => setRating(1)} onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={() => handleMouseLeave(1)} className='add-review-star add-review-star1'>☆</div>
                    <div ref={el => starRefs.current[1] = el} onClick={() => setRating(2)} onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={() => handleMouseLeave(2)} className='add-review-star add-review-star2'>☆</div>
                    <div ref={el => starRefs.current[2] = el} onClick={() => setRating(3)} onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={() => handleMouseLeave(3)} className='add-review-star add-review-star3'>☆</div>
                    <div ref={el => starRefs.current[3] = el} onClick={() => setRating(4)} onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={() => handleMouseLeave(4)} className='add-review-star add-review-star4'>☆</div>
                    <div ref={el => starRefs.current[4] = el} onClick={() => setRating(5)} onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={() => handleMouseLeave(5)} className='add-review-star add-review-star5'>☆</div>
                </div>
                <input type="date" onChange={(e) => setDate(e.target.value)}/>
                <button disabled={submitDisabled} onClick={(e) => handleSubmit(e)}>Submit</button>
            </form>

        </div>
    )
}
