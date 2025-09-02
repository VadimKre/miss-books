import { bookService } from '../services/books.service.js'

import { BookPreview } from "../cmps/BookPreview.jsx"

const { useState, useEffect, useRef} = React

export function BookFilter({ filterBy, onSetFilterBy}) {

    const [filterToEditBy, setFilterToEditBy] = useState({ ...filterBy })

    // function handleNameChange({ target: { name, value }  }) {
    //     console.log('target.name: ', target.name)
    //     setFilterToEditBy( (prev) => ({ ...prev, [name]: value}))
    // }

    // function handlePriceChange({ target: { name, value }  }) {
    //     console.log('target.price: ', target.price)
    //     setFilterToEditBy( (prev) => ({ ...prev, price: target.price}))
    // }

    function handleChange({ target: { name, value } }) {
        setFilterToEditBy(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function onSubmitFilter(ev){
        ev.preventDefault()
        onSetFilterBy(filterToEditBy)
    }

    const { name, price } = filterToEditBy

    return (
        <div className='book-filter'>
            <h2>Filter Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' value={name} onChange={handleChange}/>
                <label htmlFor="price">Price</label>
                <input type="text" id='price' name='price' value={price} onChange={handleChange}/>
                <button>Submit</button>
            </form>
        </div>
    )
}