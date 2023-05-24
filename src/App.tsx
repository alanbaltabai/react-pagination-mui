import { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Record, FetchedData } from './interfaces';

function App() {
	const [fetchedData, setFetchedData] = useState<Record[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);
	const lastRecord: number = currentPage * recordsPerPage;
	const firstRecord: number = lastRecord - recordsPerPage;
	const recordParagraphs: JSX.Element[] = fetchedData.map((item: Record) => (
		<p key={item.id}>
			<span>{item.id}) </span>
			{item.title}
		</p>
	));

	useEffect(() => {
		async function fetchData() {
			const response: Response = await fetch(
				`https://dummyjson.com/products?limit=${recordsPerPage}&skip=${firstRecord}`
			);
			const data: FetchedData = await response.json();

			setFetchedData(data.products);
		}

		fetchData();
	}, [recordsPerPage, firstRecord]);

	function handlePageChange(_event: React.ChangeEvent<unknown>, value: number) {
		setCurrentPage(value);
	}

	return (
		<div>
			{recordParagraphs}
			<Pagination
				count={6}
				color='primary'
				size='large'
				page={currentPage}
				onChange={handlePageChange}
				// sx={{ button: { color: '#fff' } }}
			/>
		</div>
	);
}

export { App };
