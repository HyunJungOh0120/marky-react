import React from 'react';

import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import Navbar from './Components/Navigation/Navbar';
import './index.css';
import { MainProvider } from './MainProvider';

// import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

ReactDOM.render(
	<MainProvider>
		<QueryClientProvider client={queryClient}>
			<Router>
				<React.StrictMode>
					<Navbar />
					<App />
				</React.StrictMode>
			</Router>
		</QueryClientProvider>
	</MainProvider>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
