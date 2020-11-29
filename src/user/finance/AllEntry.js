import React, { useEffect } from 'react';
import { useState } from 'react';
import { isAuthenticated } from '../../auth/helper';
import Base from '../../core/Base';
import { getAllEntries } from '../helper/financeHelper';

function AllEntry(props) {
	const [ entries, setEntries ] = useState([]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		getAllEntries(token)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setEntries(data);
				}
			})
			.catch((err) => console.log(err));
	}, []);

	const dateFormat = (data) => {
		if (!data) return '---------';
		let d = new Date(data);
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	};

	return (
		<Base title={'Receipts'} description='Last 5 days receipts'>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Date</th>
						<th scope='col'>Voucher No</th>
						<th scope='col'>Particular</th>
						<th scope='col'>Amount</th>
					</tr>
				</thead>
				<tbody>
					{entries &&
						entries.map((entry, i) => {
							return (
								<tr key={entry._id}>
									<td>{dateFormat(entry.date)}</td>
									<td>{entry.voucherNo}</td>
									<td>{entry.particular}</td>
									<td>{entry.amount}</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</Base>
	);
}

export default AllEntry;
