import React, { useEffect, useState } from 'react';
import Base from '../../core/Base';
import { isAuthenticated } from '../../auth/helper';
import { createSeries, getSeries } from '../helper/financeHelper';
import SeriesItem from './SeriesItem';

function Series(props) {
	const [ seriesName, setSeriesName ] = useState('');
	const [ updateSeriesName, setUpdateSeriesName ] = useState('');
	const [ visible, setVisible ] = useState(true);
	const [ success, setSuccess ] = useState(false);
	const [ error, setError ] = useState(false);
	const [ series, setSeries ] = useState([]);
	const [ reload, setReload ] = useState(false);
	const [ loading, setLoading ] = useState(false);

	const { user, token } = isAuthenticated();

	useEffect(
		() => {
			getSeries(token)
				.then((data) => {
					if (data.error) {
						setError(data.error);
					} else {
						setSeries(data);
					}
				})
				.catch((err) => console.log(err));
		},
		[ success, reload ]
	);

	const handleChange = (event) => {
		setLoading(false);
		setError('');
		setSeriesName(event.target.value);
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

	const onSubmit = (event) => {
		event.preventDefault();
		setError('');
		setLoading(true);
		setSuccess(false);
		createSeries(user._id, token, seriesName)
			.then((data) => {
				if (data.error) {
					setError(data.error);
				} else {
					setLoading(false);
					setSuccess(true);
					setSeriesName('');
				}
			})
			.catch((err) => console.log(err));
	};

	const seriesForm = () => {
		return (
			<div style={{ width: '500px' }}>
				<div className='shadow-sm p-3 mb-5 bg-white rounded'>
					<form className='col'>
						<div className='form-group'>
							<label className='lead'>Enter the Series Number:</label>
							<input
								onChange={handleChange}
								type='text'
								className='form-control'
								value={seriesName}
								autoFocus
							/>
						</div>
						{loading ? (
							<button className='btn btn-dark' disabled>
								<span className='spinner-border spinner-border-sm' />
								Loading...
							</button>
						) : (
							<button onClick={onSubmit} className='btn btn-dark'>
								Create Series
							</button>
						)}
					</form>
				</div>
			</div>
		);
	};

	return (
		<Base title='Series' description='Manage your Series from here.'>
			{successMessage()}
			{errorMessage()}
			<div>{seriesForm()}</div>
			<table style={{ width: '500px' }} className='table'>
				<thead className='thead-light'>
					<tr>
						<th scope='col'>#</th>
						<th scope='col'>Name</th>
						<th scope='col'>Action</th>
					</tr>
				</thead>
				<tbody>
					{series.map((s, i) => {
						return <SeriesItem s={s} i={i + 1} setReload={setReload} reload={reload} />;
					})}
				</tbody>
			</table>
		</Base>
	);
}

export default Series;
