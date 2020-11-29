import React from 'react';
import { Link } from 'react-router-dom';
import Base from '../../core/Base';
import AllFinance from './AllFinance';

function Finance(props) {
	return (
		<Base title='Finance' description='Manage your Finance here.'>
			<Link to='/createfinance' className='btn btn-outline-dark'>
				<span tabIndex='1'>Create Finance</span>
			</Link>
			<Link to='/due' className='btn btn-outline-dark'>
				<span tabIndex='3'>Outstanding</span>
			</Link>
			<Link to='/receipts' className='btn btn-outline-dark'>
				Receipts
			</Link>
			<AllFinance />
		</Base>
	);
}

export default Finance;
