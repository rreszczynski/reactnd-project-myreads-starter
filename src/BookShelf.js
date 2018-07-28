import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

class BookShelf extends React.Component {
	static propTypes = {
		bookShelfTilte: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
	
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.bookShelfTilte}</h2>
				<div className="bookshelf-books">
				<ol className="books-grid">
					{this.props.books.map((book) => (
								<Book key={book.id} book={book} changeShelf={this.props.changeShelf}/>
					))}    
				</ol>
			</div>
			</div>
		)
	}
}

export default BookShelf