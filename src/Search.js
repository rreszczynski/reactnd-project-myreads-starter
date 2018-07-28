import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from './Book.js'
import PropTypes from 'prop-types'

class Search extends React.Component {
	static propTypes = {
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}	
	
	state = {
		query: '',
		foundBooks: []
	}
	
	changeShelf = (book, shelf) => {
		var idx = this.state.foundBooks.indexOf(book)
		var updatedBooks = this.state.foundBooks
		updatedBooks[idx].shelf = shelf
		this.setState({ foundBooks: updatedBooks })
		this.props.changeShelf(book, shelf)
	}
	
	updateQuery = (query) => {
			if(!query) {
				this.setState({
					query: '',
					foundBooks: []
				})
			} else {
				this.setState({ query })
				BooksAPI.search(query).then((foundBooks) => {
					if (foundBooks.error) foundBooks = []
					foundBooks.map(foundBook => (this.props.books.filter((myBook) => myBook.id === foundBook.id).map(matchedBook => foundBook.shelf = matchedBook.shelf)))
					this.setState({ foundBooks })
				})
			}
	}
	
	render() {
		return(
		<div className="search-books">
			<div className="search-books-bar">
				<Link to='/' className='close-search'>Close</Link>
				<div className="search-books-input-wrapper">
					{/*
					NOTES: The search from BooksAPI is limited to a particular set of search terms.
					You can find these search terms here:
					https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md   
					However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
					you don't find a specific author or title. Every search is limited by search terms.
				*/}
				<input
						type="text"
						placeholder="Search by title or author"
						onChange={(ev) => this.updateQuery(ev.target.value)}
				/>
				</div>
			</div>
			<div className="search-books-results">
				<ol className="books-grid">
					{this.state.foundBooks.map((book) => (
						<Book key={book.id} book={book} changeShelf={this.changeShelf}/>
					))} 
				</ol>
			</div>
		</div>
		)
	}
}

export default Search