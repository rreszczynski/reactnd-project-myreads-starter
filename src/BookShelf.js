import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book.js'

const BookShelf = (props) => {
	BookShelf.propTypes = {
		bookShelfTilte: PropTypes.string.isRequired,
		books: PropTypes.array.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
	
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.bookShelfTilte}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.map((book) => (
						<Book key={book.id} book={book} changeShelf={props.changeShelf}/>
					))}
				</ol>
			</div>
		</div>
	)
}

export default BookShelf