import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import Base from '../../core/Base';
import { deleteDue, getAllDues } from '../helper/financeHelper';

function Due(props) {
	const [ dues, setDues ] = useState([]);
	const [ reload, setReload ] = useState(false);
	const [ success, setSuccess ] = useState('');
	const [ error, setError ] = useState('');

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllDues(token, user._id)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setDues(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(
		() => {
			preload();
		},
		[ reload ]
	);

	const dateFormat = (data) => {
		if (!data) return '---------';
		let d = new Date(data);
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	};

	const onDelete = (dueId) => {
		deleteDue(token, user._id, dueId).then((data) => {
			if (data.error) {
				setError(data.error);
			} else {
				setReload(!reload);
				setSuccess(true);
			}
		});
	};

	const successMessage = () => {
		return (
			<div className='row'>
				<div className='col-md-8 offset-sm-2 text-left'>
					<div className='alert alert-success' style={{ display: success ? '' : 'none' }}>
						Operation Successfully?
					</div>
				</div>
			</div>
		);
	};

	const errorMessage = () => {
		return (
			<div className='row'>
				<div className='col-md-8 offset-sm-2 text-left'>
					<div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
						{error}
					</div>
				</div>
			</div>
		);
	};

	return (
		<Base title='Outstanding' description='All your Outstandings'>
			{successMessage()}
			{errorMessage()}
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Name</th>
						<th scope='col'>Due Date</th>
						<th scope='col'>Mobile no</th>
						<th scope='col'>Overdue</th>
					</tr>
				</thead>
				<tbody>
					{dues &&
						dues.map((due, i) => {
							return (
								<tr key={due._id}>
									<td>{i + 1}</td>
									<td>{due.finance.name}</td>
									<td>{dateFormat(due.finance.dueDate)}</td>
									<td>{due.finance.mobileNo}</td>
									<td>{due.amount}</td>
									<td>
										<Link
											target='blank'
											to={`/statement/${due.finance._id}`}
											className='btn btn-sm btn-outline-secondary'>
											Statement
										</Link>
									</td>
									<td>
										<Link
											target='blank'
											to={`/receipt/${due.finance._id}`}
											className='btn btn-sm btn-outline-success'>
											Pay
										</Link>
									</td>
									{/* <td>
										<span onClick={() => onDelete(due._id)} className='btn btn-outline-danger'>
											Delete
										</span>
									</td> */}
								</tr>
							);
						})}
				</tbody>
			</table>
		</Base>
	);
}

export default Due;
