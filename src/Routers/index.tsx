import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { getStatisticAsync } from '../Apis/Statistic/RStatistic';
import { getInfoUserAsync } from '../Apis/Users/RInfo';
import SideBar from '../Components/SideBar';
import BannerHome from '../Features/Banner';
import BillManager from '../Features/BillManager';
import BlogEdit from '../Features/Blog';
import BlogDetail from '../Features/Blog/Pages/blogDetail';
import CategoryManager from '../Features/CategoryManager';
import EmailRequest from '../Features/EmailRequest';
import GeneralReport from '../Features/HomePage/Components/GeneralReport';
import PriceShip from '../Features/PriceShip';
import ProductManager from '../Features/ProductManager';
import UserManager from '../Features/UserManager';
import { loginCtx } from '../Store/login.context';
import { statisticCtx } from '../Store/statistic.context';

const Routers = () => {
	const [_, statisticActions] = statisticCtx();
	const [loginState, loginActions] = loginCtx();
	const getStatistic = async () => {
		const result = await getStatisticAsync();
		if (result.success) {
			console.log(result.data);
			statisticActions.setStatistic(result.data);
		} else {
			console.log(result.message);
			statisticActions.setStatistic(undefined);
		}
	};

	const getUserLogin = async () => {
		const result = await getInfoUserAsync({ token: '' });
		if (result.success) {
			loginActions.setUser(result.data);
		} else {
			loginActions.setUser(undefined);
		}
	};
	React.useEffect(() => {
		getStatistic();
	}, []);

	React.useEffect(() => {
		getUserLogin();
	},[])
	return (
		<Router>
			<Suspense fallback={<h1>Loading ...</h1>}>
				<div className='h-screen flex flex-row flex-wrap'>
					<SideBar />
					<div className='bg-gray-100 flex-1 p-6 md:mt-16'>
						<GeneralReport />
						<Switch>
							<Route path='/admin/bill-manager' exact>
								<BillManager />
							</Route>

							<Route path='/admin/banner-manager' exact>
								<BannerHome />
							</Route>
							<Route path='/admin/category-manager' exact>
								<CategoryManager />
							</Route>
							<Route path='/admin/user-manager' exact>
								<UserManager />
							</Route>
							<Route path='/admin/product-manager' exact>
								<ProductManager />
							</Route>
							<Route path='/admin/blog-manager' exact>
								<BlogEdit />
							</Route>
							<Route path='/admin/blog-manager/:slug' exact>
								<BlogDetail />
							</Route>
							<Route path='/admin/price-ship-manager' exact>
								<PriceShip />
							</Route>
							<Route path='/admin/email-request' exact>
								<EmailRequest />
							</Route>
						</Switch>
					</div>
				</div>
			</Suspense>
		</Router>
	);
};
export default Routers;
