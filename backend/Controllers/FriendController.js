function friendOutput(req, res) {
	let accessToken = req.headers["authorization"];
	let refreshToken = req.headers["x-refresh-token"];

	console.log("access(friendOutput): ", accessToken);
	console.log("refresh(friendOutput): ", refreshToken);
	return res.status(200).send({ message: "Testing my friendOutput" });
}

//Here is where a lot of my logic is going to be
//ORM Queries for getting list of Friends of a user/Intrests etc.

module.exports = { friendOutput };
