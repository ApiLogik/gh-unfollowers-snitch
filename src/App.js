import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom'

import './App.css';

import Header from './components/Header/Header';
import Main from './pages/main';

const App = () =>{
  return (
		<Router>
			<Header />
			<Main />
		</Router>
  );
}

export default App;
