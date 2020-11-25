import React from 'react';
import { useState } from 'react';
import { isAuthenticated } from '../../auth/helper';
import { updateSeries } from '../helper/financeHelper';

function SeriesItem({ s, i, setReload, reload }) {
	const [ seriesName, setSeriesName ] = useState(s.name);
	const [ isEdit, setisEdit ] = useState(false);

	const { user, token } = isAuthenticated();
	const onSubmit = () => {
		updateSeries(token, s._id, user._id, seriesName).then((data) => {
			if (data.error) {
				console.log(data.error);
			} else {
				setisEdit(!isEdit);
				setReload(!reload);
			}
		});
	};

	return (
		<tr key={s._id}>
			{isEdit ? (
				<React.Fragment>
					<th scope='row'>{i}</th>
					<td>
						<input
							onChange={(event) => {
								setSeriesName(event.target.value);
							}}
							autoFocus
							value={seriesName}
							type='text'
							className='form-control'
						/>
					</td>
					<td>
						<span onClick={onSubmit} className='btn btn-success'>
							Update
						</span>
					</td>
				</React.Fragment>
			) : (
				<React.Fragment>
					<th scope='row'>{i}</th>
					<td>{s.name}</td>
					<td
						onClick={() => {
							setisEdit(!isEdit);
						}}
						className='btn'>
						edit
					</td>
				</React.Fragment>
			)}
		</tr>
	);
}

export default SeriesItem;
