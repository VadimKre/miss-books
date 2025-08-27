const { useState, useEffect, useRef} = React

export function HomePage(){
    return(
        <section className='home-container'>
            
            <img className='home-img' src="./assets/img/homeImg.png" alt="" />
            <div className='home-text-container'>
                <h1>Miss Books</h1>          
                <h2>Explore the shelf.</h2>
                <p className='home-text'>Browse straightforward book cards with titles, prices, and bite-sized blurbs. Simple, friendly, and fast.</p>
                
            </div>
        </section>
    )
}