import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../auth/helper';
import Base from '../../core/Base';
import { getEntries, getFinance } from '../helper/financeHelper';
import Entry from './Entry';

function Statement({ match }) {
	const [ values, setValues ] = useState({
		DOP: '',
		dueDate: '',
		caseNo: '',
		name: '',
		address: '',
		mobileNo: '',
		product: '',
		brand: '',
		price: '15000',
		downPayment: '2000',
		processingFee: '1000',
		interest: '',
		months: '',
		pending: '',
		success: false,
		error: '',
		loading: false
	});
	const [ entries, setEntries ] = useState([]);
	const [ reload, setReload ] = useState(true);

	const {
		DOP,
		dueDate,
		caseNo,
		name,
		address,
		mobileNo,
		product,
		price,
		brand,
		downPayment,
		processingFee,
		interest,
		months,
		pending,
		success,
		error
	} = values;

	const { user, token } = isAuthenticated();

	const preload = () => {
		setValues({ ...values, error: '' });
		getFinance(token, match.params.financeId).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					DOP: data.DOP,
					dueDate: data.dueDate,
					caseNo: data.caseNo,
					name: data.name,
					address: data.address,
					mobileNo: data.mobileNo,
					product: data.product,
					brand: data.brand,
					price: data.price,
					downPayment: data.downPayment,
					processingFee: data.processingFee,
					interest: data.interest,
					months: data.months,
					pending: data.pending
				});
			}
		});
	};

	useEffect(
		() => {
			preload();
			getEntries(token, match.params.financeId).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setEntries(data);
				}
			});
		},
		[ reload ]
	);

	const dateFormat = (data) => {
		if (!data) return '---------';
		let d = new Date(data);
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	};

	return (
		<Base title='Statement of Customer'>
			<table className='table table-sm'>
				<tbody>
					<tr>
						<th scope='row'> Name</th>
						<td>{name}</td>
					</tr>
					<tr>
						<th scope='row'> DOP</th>
						<td>{dateFormat(DOP).trim()}</td>
					</tr>
					<tr>
						<th scope='row'> Due Date</th>
						<td>{dateFormat(dueDate).trim()}</td>
					</tr>
					<tr>
						<th scope='row'> Case No</th>
						<td>{caseNo}</td>
					</tr>
					<tr>
						<th scope='row'> Address</th>
						<td>{address}</td>
					</tr>
					<tr>
						<th scope='row'> Mobile No</th>
						<td>{mobileNo}</td>
					</tr>
					<tr>
						<th scope='row'> Product Name</th>
						<td>{product}</td>
					</tr>
					<tr>
						<th scope='row'> Brand</th>
						<td>{brand}</td>
					</tr>
					<tr>
						<th scope='row'> Price</th>
						<td>{price}</td>
					</tr>
					<tr>
						<th scope='row'> Down Payment</th>
						<td>{downPayment}</td>
					</tr>
					<tr>
						<th scope='row'> Processing Fee</th>
						<td>{processingFee}</td>
					</tr>
					<tr>
						<th scope='row'>Pending Amount</th>
						<td>{pending}</td>
					</tr>
					<tr>
						<th scope='row'> Interest per Month &times; Months</th>
						<td>
							{interest} &times; {months}{' '}
							<span className='h6'>= {parseInt(interest) * parseInt(months)}</span>
						</td>
					</tr>
				</tbody>
			</table>

			<div className='row'>
				<div className='form-group col-sm-12'>
					<span>Gross Loan Amount : &nbsp; </span>
					<span>{parseInt(price) - parseInt(downPayment) + parseInt(processingFee)}</span>
				</div>
			</div>
			<div className='row'>
				<div className='form-group col-sm-12'>
					<span>Net Loan Amount : &nbsp; </span>
					<span>
						{parseInt(price) -
							parseInt(downPayment) +
							parseInt(processingFee) +
							parseInt(interest) * parseInt(months)}
					</span>
				</div>
			</div>
			<div className='row'>
				<div className='form-group col-sm-12'>
					<span>EMI Amount : &nbsp; </span>
					<span>
						{Math.floor(
							(parseInt(price) -
								parseInt(downPayment) +
								parseInt(processingFee) +
								parseInt(interest) * parseInt(months)) /
								parseInt(months)
						)}
					</span>
				</div>
			</div>
			<table className='table table-sm'>
				<thead>
					<tr>
						<th scope='col'>Date</th>
						<th scope='col'>voucherNo</th>
						<th scope='col'>Particular</th>
						<th scope='col'>Amount</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{entries.map((entry, i) => {
						return <Entry key={entry._id} entry={entry} setReload={setReload} reload={reload} />;
					})}
				</tbody>
			</table>
		</Base>
	);
}

export default Statement;
