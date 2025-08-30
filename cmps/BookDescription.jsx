export function BookDescription({ desc, numOfCharToDisplay }) {

    const descToDisplay = desc.length > numOfCharToDisplay ? desc.slice(0, numOfCharToDisplay) + '...' : desc

    return(
        <p className='book-description'>{descToDisplay}</p>
    )
}