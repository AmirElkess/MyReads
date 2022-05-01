import React, { Component } from 'react'
import './App.css'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

class Library extends Component {


  updateBooks = (books) => {
    const {onUpdateBooks} = this.props
    onUpdateBooks(books.currentlyReading, books.wantToRead, books.read)
  }

  render() {

    const { currentlyReading, read, wantToRead, books } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => currentlyReading.includes(book.id)).map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBooks={this.updateBooks} />
                    </li>
                  ))}


                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => wantToRead.includes(book.id)).map(book => (
                    <li key={book.id}>
                      <Book book={book} onUpdateBooks={this.updateBooks} />
                    </li>
                  ))}

                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.filter(book => read.includes(book.id)).map(book => (
                    <li key={book.id}>
                      <Book book={book}
                        onUpdateBooks={this.updateBooks}
                      />
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="open-search">
          <Link to="/search"><button></button></Link>

        </div>
      </div>

    )
  }
}

Library.propTypes = {
  currentlyReading: PropTypes.array,
  read: PropTypes.array,
  wantToRead: PropTypes.array,
  books: PropTypes.array,
  onUpdateBooks: PropTypes.func
}

export default Library