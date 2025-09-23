import { utilService } from './util.service.js'

export const gbooksService = {
    searchBooks,
    mapToLocalBook,
}

// Query Google Books API for volumes matching the given term.
// Returns the raw items array (so callers can choose how to render),
// or an empty array if nothing found.
async function searchBooks(term) {
    const q = (term || '').trim()
    if (!q) return []

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${encodeURIComponent(q)}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch from Google Books')
    const data = await res.json()
    return Array.isArray(data.items) ? data.items : []
}

// Map a Google Books item into the local book shape used by bookService
function mapToLocalBook(item) {
    const vi = (item && item.volumeInfo) ? item.volumeInfo : {}
    const si = (item && item.saleInfo) ? item.saleInfo : {}

    const listPrice = (si && si.listPrice) ? si.listPrice : null
    const amount = (listPrice && typeof listPrice.amount === 'number')
        ? listPrice.amount
        : utilService.getRandomIntInclusive(20, 200)
    const currencyCode = (listPrice && listPrice.currencyCode)
        ? listPrice.currencyCode
        : 'USD'

    const imageLinks = vi && vi.imageLinks ? vi.imageLinks : null
    const thumbnail = imageLinks && (imageLinks.thumbnail || imageLinks.smallThumbnail)
        ? (imageLinks.thumbnail || imageLinks.smallThumbnail)
        : 'assets/img/default.png'

    const dateStr = vi && vi.publishedDate ? String(vi.publishedDate) : ''
    const year = parseInt(dateStr.slice(0, 4), 10)

    return {
        title: vi && vi.title ? vi.title : 'Untitled',
        subtitle: vi && vi.subtitle ? vi.subtitle : '',
        authors: vi && vi.authors ? vi.authors : [],
        publishedDate: isFinite(year) ? year : new Date().getFullYear(),
        description: vi && vi.description ? vi.description : '',
        pageCount: vi && vi.pageCount ? vi.pageCount : 100,
        categories: vi && vi.categories ? vi.categories : [],
        thumbnail,
        language: vi && vi.language ? vi.language : 'en',
        listPrice: {
            amount: amount,
            currencyCode: currencyCode,
            isOnSale: Math.random() > 0.6,
        },
    }
}
