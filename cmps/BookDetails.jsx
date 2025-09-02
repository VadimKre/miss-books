export function BookDetails({ bookDetails }){


    console.log('book.title: ', book.title)
    return(
        <section className='book-details-modal'>
            <h3>{bookDetails.title}</h3>
        </section>
    )
}