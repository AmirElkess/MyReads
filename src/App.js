import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Search from './Search'
import Library from './Library'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    currentlyReading: [], //containing ids only
    wantToRead: [],
    read: [],
    books: []
  }

  getLatest = () => {
    BooksAPI.getAll()
      .then((books) => {
        let currReading = []
        let wantToRead = []
        let read = []
        for (const book of books) {
          if (book.shelf === "currentlyReading") {
            currReading.push(book.id)
          } else if (book.shelf === "wantToRead") {
            wantToRead.push(book.id)
          } else if (book.shelf === "read") {
            read.push(book.id)
          } else {
            console.log("Unrecognized shelf")
          }
        }
        this.setState(() => ({
          books: books,
          currentlyReading: currReading,
          wantToRead: wantToRead,
          read: read,
        }))
      })
  }

  componentDidMount() {
    // console.log("didmount appjs")
    this.getLatest()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.books.length !== this.state.books.length
      || prevState.read.length !== this.state.read.length
      || prevState.wantToRead.length !== this.state.wantToRead.length
      || prevState.currentlyReading.length !== this.state.currentlyReading.length
      ) {
      this.getLatest()
    }
  }

  updateBooks = (currentlyReading, wantToRead, read) => {
    //console.log("appjs updating with data: ", currentlyReading, wantToRead, read)
    this.setState({
      currentlyReading,
      wantToRead,
      read
    })
  }

  render() {

    return (
      <div className="app">

        <Route
          exact path="/"
          onUpdateData={this.updateData}
          render={() => (
            <Library
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              books={this.state.books}
              onUpdateBooks={this.updateBooks}
            />
          )} />

        <Route exact path="/search" render={() => (
          <Search onUpdateBooks={this.updateBooks} 
          currentlyReading={this.state.currentlyReading}
          wantToRead={this.state.wantToRead}
          read={this.state.read}
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
