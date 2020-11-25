import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../auth/helper';
import Base from '../../core/Base';
import { getAllFinance, getSeries } from '../helper/financeHelper';

function AllFinance({ match, location }) {
	const [ finances, setFinances ] = useState([]);
	const [ searchText, setSearchText ] = useState('');
	const [ values, setValues ] = useState({
		seriesNo: '',
		series: []
	});

	const { seriesNo, series } = values;
	const { user, token } = isAuthenticated();

	const preload = async () => {
		getSeries(token)
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({ ...values, series: data });
				}
			})
			.catch((err) => console.log(err));
	};

	const getFinances = () => {
		getAllFinance(token, seriesNo)
			.then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setFinances(data);
				}
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		preload();
	}, []);

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value, loading: false });
	};

	let filteredFinance = finances.filter((finance) => {
		return finance.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
	});

	const filterFinance = (event) => {
		setSearchText(event.target.value);
	};
	const dateFormat = (data) => {
		if (!data) return '---------';
		let d = new Date(data);
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	};

	return (
		<div className='mt-4'>
			<div className='row'>
				<div className='form-group col-sm-4'>
					<select onChange={handleChange('seriesNo')} className='form-control'>
						<option value=''>Select Series</option>
						{series &&
							series.map((s, index) => (
								<option key={index} value={s._id}>
									{s.name}
								</option>
							))}
					</select>
				</div>
				<div className='form-groupo col-sm-2'>
					<button onClick={getFinances} className='btn btn-success'>
						Get
					</button>
				</div>
				<div className='col-sm-2' />
				<div className='col-sm-4'>
					<input
						placeholder='Search'
						value={searchText}
						onChange={filterFinance}
						type='text'
						className='form-control'
					/>
				</div>
			</div>
			<table className='table'>
				<thead>
					<tr>
						<th scope='col'>Name</th>
						<th scope='col'>DOP</th>
						<th scope='col'>Due Date</th>
						<th scope='col'>Case No</th>
						<th scope='col'>Mobile No</th>
						<th scope='col'>Pending </th>
						<th />
					</tr>
				</thead>
				<tbody>
					{filteredFinance &&
						filteredFinance.map((finance, i) => {
							return (
								<tr key={finance._id}>
									<td>{finance.name}</td>
									<td>{dateFormat(finance.DOP)}</td>
									<td>{dateFormat(finance.dueDate)}</td>
									<td>{finance.caseNo}</td>
									<td>{finance.mobileNo}</td>
									<td>{finance.pending}</td>
									<td>
										<Link
											target='blank'
											to={`/statement/${finance._id}`}
											className='btn btn-sm btn-outline-secondary'>
											Full Statement
										</Link>
									</td>
									<td>
										<Link
											target='blank'
											to={`/receipt/${finance._id}`}
											className='btn btn-sm btn-outline-success'>
											Pay
										</Link>
									</td>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
}

export default AllFinance;
