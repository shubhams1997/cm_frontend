import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../auth/helper';
import { ReactComponent as DashboardIcon } from '../images/dashboard.svg';
import { ReactComponent as CategoryIcon } from '../images/category.svg';
import { ReactComponent as PersonAddIcon } from '../images/person_add.svg';
import { ReactComponent as ProductIcon } from '../images/product.svg';
import { ReactComponent as CustomerIcon } from '../images/customers.svg';
import { ReactComponent as FinanceIcon } from '../images/finance.svg';

const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: 'rgb(7,107,255)' };
	} else {
		return { color: 'rbg(51,51,51)' };
	}
};

const Menu = ({ history, username = 'User', role = 0 }) => {
	return (
		<React.Fragment>
			<nav className='navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow'>
				<span className='navbar-brand col-sm-3 col-md-2 mr-0'>New Deepak Electronics</span>
				<ul className='navbar-nav px-3'>
					<li className='nav-item text-nowrap'>
						<span
							className='nav-link'
							onClick={() =>
								signout(() => {
									history.push('/');
								})}>
							Sign out
						</span>
					</li>
				</ul>
			</nav>
			<nav className='col-md-2 d-none d-md-block bg-light sidebar'>
				<div className='sidebar-sticky'>
					<ul className='nav flex-column'>
						<li className='nav-item'>
							<span className='nav-link h5'>{username} </span>
						</li>
						<li className='nav-item '>
							<span className='nav-link text-info'>{role} </span>
						</li>
						<div className='dropdown-divider' />
						<li className='nav-item'>
							<Link style={currentTab(history, '/dashboard')} to='/dashboard' className='nav-link'>
								<DashboardIcon /> &nbsp; Dashboard
							</Link>
						</li>
						<li className='nav-item'>
							<Link
								style={currentTab(history, '/categoryBrand')}
								to='/categoryBrand'
								className='nav-link'>
								<CategoryIcon />
								&nbsp; Category & Brand
							</Link>
						</li>
						<li className='nav-item'>
							<Link style={currentTab(history, '/products')} className='nav-link' to='/products'>
								<ProductIcon />
								&nbsp; Products
							</Link>
						</li>
						<li className='nav-item'>
							<Link style={currentTab(history, '/complaint')} className='nav-link' to='/complaint'>
								<CustomerIcon /> &nbsp; Complaint
							</Link>
						</li>
						{isAuthenticated() &&
						isAuthenticated().user.role == 1 && (
							<React.Fragment>
								<li className='nav-item'>
									<Link style={currentTab(history, '/signup')} className='nav-link' to='/signup'>
										<PersonAddIcon /> &nbsp; Create Employee
									</Link>
								</li>
								<li className='nav-item'>
									<Link style={currentTab(history, '/finance')} className='nav-link' to='/finance'>
										<FinanceIcon /> &nbsp; Finance
									</Link>
								</li>
							</React.Fragment>
						)}
					</ul>
				</div>
			</nav>
		</React.Fragment>
	);
};

export default withRouter(Menu);
