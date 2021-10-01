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
			<label htmlFor="user-name">Your Github username*:</label>
			<input className="user-name" type="text" />
			<button id="enviar" onClick={handleFormSubmit}>Go...</button>
			<p className="warning">*Login name. Case sensitive.</p>

			<div className="show-result">
				{dataLoaded ? (
					<>
						<h2>Results for: "{userName}"</h2>
						<div className="counters">
							<Link to="/following">Following: <span>{following.length}</span></Link>
							<Link to="/followers">Followers: <span>{followers.length}</span></Link>
							<Link to="/mutual">Mutual: <span>{mutualFollowers.length}</span></Link>
							<Link to="/dontfollow">Don't follow: <span>{dontFollow.length}</span></Link>
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
										<h3>Don't follow back:</h3>
										<List data={dontFollow} />
									</>
								)}
							></Route>
							<Route
								exact path="/following"
								render={() => (
									<>
										<h3>Following:</h3>
										<List data={following} />
									</>
								)}
							></Route>
							<Route
								exact path="/followers"
								render={() => (
									<>
										<h3>Followers:</h3>
										<List data={followers} />
									</>
								)}
							></Route>
							<Route
								exact path="/mutual"
								render={() => (
									<>
										<h3>Mutual followers:</h3>
										<List data={mutualFollowers} />
									</>
								)}
							></Route>
							<Route
								path="/"
								render={() => (
									<>
										<h3>Don't follow back:</h3>
										<List data={dontFollow} />
									</>
								)}></Route>
						</Switch>
					</div>
				) : (<p>There are no results to display yet!</p>)}
			</div>
		</div>
	);
}

export default Result;