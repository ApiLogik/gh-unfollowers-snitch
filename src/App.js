import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'

import './App.css';
import Footer from './components/Footer/Footer';

import Header from './components/Header/Header';
import Main from './pages/main';

const App = () =>{
  return (
		<Router>
			<Header />
			<Main />
			<Footer />
		</Router>
  );
}

export default App;
