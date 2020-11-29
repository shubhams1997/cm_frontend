import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminRoute from './auth/helper/AdminRoute';
import PrivateRoute from './auth/helper/PrivateRoute';
import Home from './core/Home';
import AllUsers from './admin/AllUsers';
import CategoryBrand from './user/CategoryBrand';
import Complaint from './user/Complaint';
import Dashboard from './user/Dashboard';
import Product from './user/Product';
import Signin from './user/Signin';
import Signup from './user/Signup';
import AllProducts from './user/AllProducts';
import UpdateProduct from './user/UpdateProduct';
import AllComplaints from './user/AllComplaints';
import UpdateComplaint from './user/UpdateComplaint';
import CreateFinance from './user/finance/CreateFinance';
import AllFinance from './user/finance/AllFinance';
import Statement from './user/finance/Statement';
import Series from './user/finance/Series';
import Finance from './user/finance/Finance';
import Receipt from './user/finance/Receipt';
import Due from './user/finance/Due';
import AllEntry from './user/finance/AllEntry';

function Routes(props) {
	return (
		<BrowserRouter>
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/signin' exact component={Signin} />
				<AdminRoute path='/signup' exact component={Signup} />
				<AdminRoute path='/allusers' exact component={AllUsers} />
				<PrivateRoute path='/dashboard' exact component={Dashboard} />
				<PrivateRoute path='/categoryBrand' exact component={CategoryBrand} />
				<PrivateRoute path='/products' exact component={Product} />
				<PrivateRoute path='/complaint' exact component={Complaint} />
				<AdminRoute path='/createfinance' exact component={CreateFinance} />
				<AdminRoute path='/finance' exact component={Finance} />
				<AdminRoute path='/series' exact component={Series} />
				<PrivateRoute path='/allproducts' exact component={AllProducts} />
				<PrivateRoute path='/allcomplaints' exact component={AllComplaints} />
				<AdminRoute path='/finances' exact component={AllFinance} />
				<AdminRoute path='/due' exact component={Due} />
				<AdminRoute path='/statement/:financeId' exact component={Statement} />
				<AdminRoute path='/receipt/:financeId' exact component={Receipt} />
				<AdminRoute path='/receipts' exact component={AllEntry} />
				<PrivateRoute path='/product/update/:productId' exact component={UpdateProduct} />
				<PrivateRoute path='/complaint/update/:complaintId' exact component={UpdateComplaint} />
			</Switch>
		</BrowserRouter>
	);
}

export default Routes;
