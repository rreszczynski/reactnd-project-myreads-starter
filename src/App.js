import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search.js'
import BookShelf from './BookShelf.js'

class BooksApp extends React.Component {
	state = {
		books: []
	}	
	
	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState({ books })
		})
	}
	
	componentDidMount() {
		this.getAllBooks()
	}
	
	bookChangeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then(() => {
			this.getAllBooks()
		})		
	}
	render() {
		return (
			<div className="app">
				{/* MAIN PAGE */}
				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf
									bookShelfTilte='Currently Reading'
									books={this.state.books.filter((book) => (book.shelf === 'currentlyReading'))}
									changeShelf={this.bookChangeShelf}
								/>
								<BookShelf
									bookShelfTilte='Want to Read'
									books={this.state.books.filter((book) => (book.shelf === 'wantToRead'))}
									changeShelf={this.bookChangeShelf}
								/>
								<BookShelf
									bookShelfTilte='Read'
									books={this.state.books.filter((book) => (book.shelf === 'read'))}
									changeShelf={this.bookChangeShelf}
								/>
							</div>
						</div>
						<div className="open-search">	
							<Link to='/search'></Link>
						</div>
					</div>
				)}/>
				
				{/* SEARCH PAGE */}
				<Route path='/search' render={() => (
					<Search
						books = {this.state.books}
						changeShelf = {this.bookChangeShelf}
					/>
				)}/>
			</div>
		)
	}
}

export default BooksApp
