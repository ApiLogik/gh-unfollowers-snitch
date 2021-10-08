import ghApi from "./axios/axios";

const getFollowersAndFollowing = async (userName, requiredData = '', total = 0) => {
	const filteredArray = [];
	const pages = Math.ceil(total / 100);
	let actualPage;

	const getAllDataPages = async () => {
		const allPages = []
		for (let i = 1; i <= pages; i++) {
			actualPage = await ghApi.get(`/users/${userName}/${requiredData}?page=${i}&per_page=100`);
			allPages.push(actualPage.data);
		}
		return allPages.flat();
	}


	return getAllDataPages()
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
	const errors = [];
	const total = await ghApi.get(`/users/${userName}`)
	.then(response => {
		return {
			followers: response.data.followers,
			following: response.data.following,
		}
	})
	.catch(err => {
		return errors.push("User doesn't exists!");
	});

	const followers = await getFollowersAndFollowing(userName, 'followers', total.followers);
	const following = await getFollowersAndFollowing(userName, 'following', total.following);
	const filtered = await filterDontFollowYou(followers, following)
	if(errors.length > 0) return false;
	return { followers, following, ...filtered };
}

export default getFollowersData;
