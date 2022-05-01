import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book'
import PropTypes from 'prop-types';



class Search extends Component {

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        const {currentlyReading, read, wantToRead} = this.props
        if (query === '') {
            this.setState(() => ({
                books: [],
                query: ''
            }))
        } else {
            this.setState({
                query: query 
            })
            BooksAPI.search(query)
                .then((books) => {
                    if (books) {
                        if (Array.isArray(books)) {
                            books.map(book => {
                                if (currentlyReading.includes(book.id)) {
                                    book.shelf = 'currentlyReading'
                                } else if (wantToRead.includes(book.id)) {
                                    book.shelf = 'wantToRead'
                                } else if (read.includes(book.id)) {
                                    book.shelf = 'read'
                                } else {
                                    book.shelf = 'none'
                                }
                                return book
                            })
                            this.setState(() => ({
                                books: books,
                            }))
                        }
                        else { //hasOwnProperty('error')
                            alert("No results found")
                            this.setState(() => ({
                                books: [],
                                query: ''
                            }))
                        }
                    }
                })
        }

    }

    updateBooks = (books) => {
        const { onUpdateBooks } = this.props
        //console.log("searchjs updating book with data: ", books)
        onUpdateBooks(books.currentlyReading, books.wantToRead, books.read)
    }

    render() {
        const { books, query } = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <form>
                            <input
                                type="text"
                                value={query}
                                placeholder="Search by title or author"
                                onChange={(e) => this.updateQuery(e.target.value)}
                            />
                        </form>
                    </div>
                </div>


                <div className="search-books-results">

                    <ol className="books-grid">
                        {books.map(book => (
                            <li key={book.id}>
                                <Book book={book} onUpdateBooks={this.updateBooks} />
                            </li>
                        ))}
                    </ol>

                </div>
            </div>

        )
    }
}


Search.propTypes = {
    currentlyReading: PropTypes.array,
    read: PropTypes.array,
    wantToRead: PropTypes.array,
    onUpdateBooks: PropTypes.func
  }

export default Search