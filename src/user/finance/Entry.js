import React from 'react';
import { useState } from 'react';
import { isAuthenticated } from '../../auth/helper';
import { updateEntry } from '../helper/financeHelper';

function Entry({ entry, i, setReload, reload }) {
	const [ newEntry, setNewEntry ] = useState({
		date: entry.date,
		particular: entry.particular,
		voucherNo: entry.voucherNo
	});

	const { date, particular, voucherNo } = newEntry;
	const [ isEdit, setisEdit ] = useState(false);

	const { user, token } = isAuthenticated();

	const handleChange = (name) => (event) => {
		setNewEntry({ ...newEntry, [name]: event.target.value });
	};

	const dateFormat = (data) => {
		if (!data) return '---------';
		let d = new Date(data);
		return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
	};

	const onSubmit = () => {
		updateEntry(token, entry._id, user._id, newEntry).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setisEdit(!isEdit);
				setReload(!reload);
			}
		});
	};

	return (
		<tr>
			{isEdit ? (
				<React.Fragment>
					<td>
						<input
							autoFocus
							type='date'
							className='form-control'
							onChange={handleChange('date')}
							value={date}
						/>
					</td>
					<td>
						<input
							type='text'
							className='form-control'
							placeholder='Voucher No'
							onChange={handleChange('voucherNo')}
							value={voucherNo}
						/>
					</td>
					<td>
						<input
							type='text'
							className=' form-control mt-2'
							placeholder='particular'
							onChange={handleChange('particular')}
							value={particular}
						/>
					</td>
					<td>{entry.amount}</td>
					<td>
						<span onClick={onSubmit} className='btn btn-success'>
							Update
						</span>
					</td>
				</React.Fragment>
			) : (
				<React.Fragment>
					<td>{dateFormat(entry.date)}</td>
					<td>{entry.voucherNo}</td>
					<td>{entry.particular}</td>
					<td>{entry.amount}</td>
					<td
						onClick={() => {
							setisEdit(!isEdit);
						}}
						className='btn-sm btn-outline-secondary'>
						edit
					</td>
				</React.Fragment>
			)}
		</tr>
	);
}

export default Entry;
