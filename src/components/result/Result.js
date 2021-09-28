import React, { useState, useEffect } from 'react';
import {
	Switch,
	Route,
	Link,
} from "react-router-dom";

import getFollowersData from '../../services/GetFollowers';
import List from '../List/List';
import Loading from '../loading/Loading';

import './Result.css';

const Result = () => {
	const [followers, setFollowers] = useState([]);
	const [following, setFollowing] = useState([]);
	const [mutualFollowers, setMutualFollowers] = useState([]);
	const [dontFollow, setDontFollow] = useState([]);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [userName, setUserName] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const getData = async () => {
			setLoading(true)

			const response = await getFollowersData(userName);

			setFollowers(response.followers);
			setFollowing(response.following);
			setMutualFollowers(response.mutualFollowers);
			setDontFollow(response.dontFollowYou);
			setLoading(false);
			setDataLoaded(true);
			document.querySelector('.user-name').value = '';
		}

		if (userName && !dataLoaded) getData();
	}, [userName, dataLoaded]);

	useEffect(() => [loading])

	const handleFormSubmit = (() => {
		setDataLoaded(false);
		setUserName(null);
		setUserName(document.querySelector('.user-name').value);
	})

	return (
		<div className="result-parent">
			<label htmlFor="user-name">Digite seu nome de usuário no Github*:</label>
			<input className="user-name" type="text" />
			<button id="enviar" onClick={handleFormSubmit}>Vai...</button>
			<p className="warning">*Nome de login exato. Diferencia letras maiúsculas e minúsculas.</p>

			<div className="show-result">
				{dataLoaded ? (
					<>
						<h2>Resultado para: "{userName}"</h2>
						<div className="counters">
							<Link to="/following">Seguindo: <span>{following.length}</span></Link>
							<Link to="/followers">Seguidores: <span>{followers.length}</span></Link>
							<Link to="/mutual">Mútuos: <span>{mutualFollowers.length}</span></Link>
							<Link to="/dontfollow">Não seguem: <span>{dontFollow.length}</span></Link>
						</div>
					</>
				) : ('')}

				{loading ? (
					<Loading />
				) : false}

				{dataLoaded ? (
					<div className="list-container">
						<Switch>
							<Route
								exact path="/dontfollow"
								render={() => (
									<>
										<h3>Não seguem de volta:</h3>
										<List data={dontFollow} />
									</>
								)}
							></Route>
							<Route
								exact path="/following"
								render={() => (
									<>
										<h3>Seguindo:</h3>
										<List data={following} />
									</>
								)}
							></Route>
							<Route
								exact path="/followers"
								render={() => (
									<>
										<h3>Seguidores:</h3>
										<List data={followers} />
									</>
								)}
							></Route>
							<Route
								exact path="/mutual"
								render={() => (
									<>
										<h3>Mútuos:</h3>
										<List data={mutualFollowers} />
									</>
								)}
							></Route>
							<Route
								path="/"
								render={() => (
									<>
										<h3>Não seguem de volta:</h3>
										<List data={dontFollow} />
									</>
								)}></Route>
						</Switch>
					</div>
				) : (<p>Ainda não há resultados para exibir!</p>)}
			</div>
		</div>
	);
}

export default Result;