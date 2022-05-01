import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'


class Book extends Component {

    handleChange = (e) => {
        const { book, onUpdateBooks } = this.props
        BooksAPI.update({ id: book.id }, e.target.value)
            .then(books => {
                if (onUpdateBooks) {
                    //console.log("bookjs updating books")
                    onUpdateBooks(books)
                }
            })
    }

    render() {

        const { book } = this.props
        let authors = []
        let thumbnail = ``
        if (book.authors) {
            authors = book.authors
        }
        if (book.imageLinks) {
            thumbnail = `url(${book.imageLinks.smallThumbnail})`
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {authors.map(author => (
                        <div key={author}>
                            {author}
                        </div>
                    ))}
                </div>

            </div>
        )

    }
}

export default Book