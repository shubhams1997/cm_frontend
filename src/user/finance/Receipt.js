import React, { useState } from 'react';
import { isAuthenticated } from '../../auth/helper';
import Base from '../../core/Base';
import { createEntry } from '../helper/financeHelper';

function Receipt({ match }) {
	const [ values, setValues ] = useState({
		date: '',
		voucherNo: '',
		particular: 'Cash Received',
		amount: '',
		error: '',
		loading: false,
		success: ''
	});
	const { user, token } = isAuthenticated();

	const { date, voucherNo, particular, amount, error, loading, success } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value, loading: false });
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, loading: true, success: false });
		createEntry(user._id, token, {
			finance: match.params.financeId,
			date,
			particular,
			voucherNo,
			amount
		})
			.then((data) => {
				if (data.error) {
					setValues({ ...values, error: data.error });
				} else {
					setValues({
						date: '',
						particular: '',
						voucherNo: '',
						amount: '',
						success: true,
						loading: false
					});
				}
			})
			.catch((err) => console.log(err));
	};

	const successMessage = () => (
		<div style={{ display: success ? '' : 'none' }} className='alert alert-success mt-3'>
			Payment Recorded Successfully.
		</div>
	);

	const errorMessage = () => {
		return (
			<div className='alert alert-danger' style={{ display: error ? '' : 'none' }}>
				{error}
			</div>
		);
	};

	const payForm = () => {
		return (
			<div className='text-center'>
				<form style={{ width: '500px', margin: '0 auto' }}>
					<h1 className='h3 mb-3 font-weight-normal'>Enter Information</h1>
					<div className='row'>
						<div className='col'>
							<input
								autoFocus
								type='date'
								className='form-control'
								onChange={handleChange('date')}
								value={date}
							/>
						</div>
						<div className='col'>
							<input
								type='text'
								className='form-control'
								placeholder='Voucher No'
								onChange={handleChange('voucherNo')}
								value={voucherNo}
							/>
						</div>
					</div>
					<input
						type='text'
						className=' form-control mt-2'
						placeholder='particular'
						onChange={handleChange('particular')}
						value={particular}
					/>
					<input
						type='text'
						className=' form-control mt-2'
						placeholder='amount'
						onChange={handleChange('amount')}
						value={amount}
					/>
					{loading ? (
						<button className='mt-2 btn btn-lg btn-dark btn-block' type='button' disabled>
							<span className='spinner-border spinner-border-sm' />
							Processing...
						</button>
					) : (
						<button onClick={onSubmit} className='mt-2 btn btn-lg btn-dark btn-block' type='submit'>
							pay
						</button>
					)}
				</form>
			</div>
		);
	};

	return (
		<Base title='Receipts' description='Entry for Cash Received for Finance.'>
			{successMessage()}
			{errorMessage()}
			{payForm()}
		</Base>
	);
}

export default Receipt;
