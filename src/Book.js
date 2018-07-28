import React from 'react'
import PropTypes from 'prop-types'

class Book extends React.Component {
	static propTypes = {
		book: PropTypes.object.isRequired,
		changeShelf: PropTypes.func.isRequired
	}
	
	render() {
		const book = this.props.book
		const title = book.title ? book.title : 'title unknown'
		const authors = book.authors ? book.authors[0] : 'author unknown'
		const cover = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : ''
		const shelf = book.shelf && book.shelf ? book.shelf : 'none'

		return(
			<li key={book.id}>
				<div className="book" >
					<div className="book-top">
						<div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url(' + cover + ')'}}></div>
						<div className="book-shelf-changer">
							<select
								onChange={(ev) => this.props.changeShelf(book, ev.target.value)}
								value={shelf}
							>
								<option value="move" disabled>Move to...</option>								
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{title}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>
		)
		}
}

export default Book