import { Octokit } from "@octokit/rest";

const octokit = new Octokit({
	auth: process.env.REACT_APP_GHTOKEN,
	userAgent: 'gh-unfollowers-snitch-1.0.0',
})

const getFollowersAndFollowing = async (userName, routeString = '') => {
	const filteredArray = [];

	return octokit.paginate(`GET /users/${userName}/${routeString}`)
		.then(response => {
			response.forEach(thisUser => {
				filteredArray.push({
					id: thisUser.id,
					login: thisUser.login,
					avatar_url: thisUser.avatar_url,
					url: thisUser.html_url,
				})
			})
		})
		.then(() => filteredArray)
		.catch(err => {
			throw new Error('Ocorreu um erro na consulta pelos seguidores: ' + err)
		})
}

const filterDontFollowYou = async (followers, following) => {
	const dontFollowYou = []
	const mutualFollowers = []
	const followersIds = followers.map(user => user.id)

	following.forEach(followed => {
		followersIds.includes(followed.id) ? mutualFollowers.push(followed) : dontFollowYou.push(followed);
	})

	return { dontFollowYou, mutualFollowers }
}

const getFollowersData = async (userName) => {
	const followers = await getFollowersAndFollowing(userName, 'followers');
	const following = await getFollowersAndFollowing(userName, 'following');
	const filtered = await filterDontFollowYou(followers, following)

	return {followers, following, ...filtered }
}

export default getFollowersData;
