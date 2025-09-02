const { useState, useEffect} = React

export function AboutUs() {


    return(
        <section className='about-us-section'>
            <h2>About Miss Books</h2>
            <p><span className='about-us-bold-text'>Miss Books</span> is a learning project that explores how to build a clear, friendly catalog for book lovers. The app presents essential book details—title, price, description, and other helpful metadata—in a simple interface that’s easy to browse and extend.</p>
            <h2>Why we built it</h2>
            <p>Miss Books exists to practice modern front-end patterns: modular services for data, routing, state management, and accessible UI. It’s a sandbox where we can experiment, refactor, and learn—without the pressure of a production app.</p>
            <h2>What you’ll find</h2>
            <ul>
                <li>Clean listings with book <span className='about-us-bold-text'>titles</span>, <span className='about-us-bold-text'>prices</span>, and <span className='about-us-bold-text'>descriptions</span></li>
                <li>Quick detail views designed for readability</li>
                <li>A structure that’s easy to expand (filters, sorting, wishlists, reviews, etc.)</li>
            </ul>
            <h2>What Miss Books is (and isn’t)</h2>
            <p>Miss Books is not a real store. It doesn’t sell or ship books. The data you see may include sample or mocked values and is used for demonstration only. We’re not affiliated with any publisher or retailer.</p>
            <h2>Looking ahead</h2>
            <p>As the project grows, we plan to iterate on features that improve discoverability and learning value—like search, tags, and richer book metadata—while keeping the codebase approachable for students and newcomers</p>
            <p className='about-us-italian-text'>Thanks for checking out Miss Books—where we learn by building, one page at a time.</p>
        </section>
    )
} 