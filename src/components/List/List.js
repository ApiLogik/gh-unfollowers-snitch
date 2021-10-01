import React from 'react';
import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

import './List.css';

const List = (props) => {
	const perPage = 100;
	const totalPages = Math.ceil(props.data.length / perPage);
	const [page, setPage] = useState(1);
	const [slicedArr, setSlicedArr] = useState(null);

	useEffect(() => {
		const paginateArray = () => {
			let arr;
			let end = page * perPage;
			let start = end - perPage;
			
			if (totalPages === 1) setPage(1);
			if (page < totalPages) arr = props.data.slice(start, end);
			if (page >= totalPages) arr = props.data.slice(start, props.data.length);
			return arr
		}

		setSlicedArr(paginateArray())
	}, [page, props.data, totalPages])

	const handleNextPage = () => {
		if (page < totalPages) setPage(page => page + 1);
	}

	const handlePrevPage = () => {
		if (page > 1) setPage(page => page - 1);
	}

	return (
		<ul>
			<div className="pages-container">
				{totalPages > 0 ? (<span>Pages ({page} of {totalPages}):  </span>) : ('None...')}
				{page > 1 ? (
					<FaChevronLeft className="arrow-prev" onClick={handlePrevPage} />
				) : false}
				{totalPages > 0 ? (<span className="page-number">{page}</span>) : ('')}
				{page < totalPages ? (
					<FaChevronRight className="arrow-next" onClick={handleNextPage} />
				) : false}
			</div>
			
			{slicedArr ? slicedArr.map((user) => (
				<li key={user.id}>
					<img src={user.avatar_url} alt="avatar" />
					<a target="_blank" href={user.url} rel="noreferrer">{user.login}</a>
				</li>
			)) : ('')}

			<div className="pages-container">
			{totalPages > 0 ? (<span>Pages ({page} of {totalPages}):  </span>) : ('')}
				{page > 1 ? (
					<FaChevronLeft className="arrow-prev" onClick={handlePrevPage} />
				) : false}
				{totalPages > 0 ? (<span className="page-number">{page}</span>) : ('')}
				{page < totalPages ? (
					<FaChevronRight className="arrow-next" onClick={handleNextPage} />
				) : false}
			</div>
		</ul>

	);
}

export default List;
