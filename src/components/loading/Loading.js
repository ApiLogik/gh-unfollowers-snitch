import React from 'react';
import { Bars } from 'react-loading-icons'
import { useState, useEffect} from 'react';

const Loading = () => {
	const [fiveSec, setFiveSec]  = useState(false)
	
	useEffect(() => {
		setTimeout(() => setFiveSec(true), 5000);
	}, [fiveSec])
	

	return (
		<div className="loading">
			<h1>Carregando...</h1>
			<Bars />
			{fiveSec ? (<p>Pera aê, depende da quantidade!</p>) : false}
		</div>
	);
}
 
export default Loading;