import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
//     getEmptyBook,
//     getDefaultFilter,
}

function _createBooks() {

    if (!utilService.loadFromStorage(BOOK_KEY)){
        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        const books = []

        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                    ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i+1}.jpg`,
                language: "en"
                
            }
            books.push(book)
        }
        utilService.saveToStorage(BOOK_KEY, books)
    }

    // console.log('books', books)
}


function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                books = books.filter(book => regExp.test(book.title))
            }

            if (filterBy.price) {
                books = books.filter(book => book.listPrice.amount >= filterBy.price)
            }

            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (car.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getDefaultFilter(filterBy = { name: '', price: 0 }) {
    return { name: filterBy.name, price: filterBy.price }
}