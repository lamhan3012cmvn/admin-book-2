import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './Components/Navbar';
import LoginPage from './Features/Login';
import Routers from './Routers';
import ForgotPassword from './Features/ForgotPassword';
import ChangePassword from './Features/ChangePassword';

function App() {

	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/login' exact>
						<LoginPage />
					</Route>
					<Route path='/forgotPassword' exact>
						<ForgotPassword />
					</Route>
					<Route path='/changePassword' exact>
						<ChangePassword />
					</Route>
				</Switch>
				<Switch>
					<Route path='/admin'>
						<Navbar />
						<Routers />
					</Route>
				</Switch>
			</Router>
			<ToastContainer
				position='top-right'
				progressClassName='toastProgress'
				autoClose={1500}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
}

export default App;
