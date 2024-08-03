const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_TIME = "15s";

///////////////////////////////////////////////
//This function will take an accessToken and see if it's valid(and present). Will also refresh accessToken if not valid
///////////////////////////////////////////////
async function AuthenticateToken(req, res, next) {
	try {
		let accessToken = req.headers["authorization"];
		let refreshToken = req.headers["x-refresh-token"];

		if (!accessToken) return res.status(401).send("Access Token is required");

		console.log("AccessToken: ", accessToken);
		console.log("RefreshToken: ", refreshToken);

		//Must use refreshToken to get user.id if accessToken is not valid
		jwt.verify(accessToken, process.env.TOKEN_SECRET, function (err, user) {
			if (err) {
				jwt.verify(refreshToken, process.env.TOKEN_SECRET, function (err, user) {
					if (err) return res.status(403).send({ message: "Invalid Refresh Token" }); //refreshToken invalid

					accessToken = RefreshAccessToken(user.id, req, res); //Get new accessToken from refresh
					//set new accessToken
					req.headers["authorization"] = accessToken;
					next();
				});
			} else {
				//accessToken is valid
				//req.user = user; //Do I need this?
				next();
			}
		});
		//req.headers["authorization"] = accessToken; --setting this here could lead to issues(sync action after async call)
		next();
	} catch (err) {
		return res.status(500).send({ message: "Failed to validate token" });
	}
}

///////////////////////////////////////////////////////////////////
//This function returns if the provided accessToken is valid or not
///////////////////////////////////////////////////////////////////
async function IsTokenValid(req, res) {
	//This does Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client ...I think
	try {
		let accessToken = req.headers["authorization"];
		let refreshToken = req.headers["X-Refresh-Token"];

		if (!accessToken) return res.status(401).send("Access Token is required");

		jwt.verify(accessToken, process.env.TOKEN_SECRET, function (err, user) {
			if (err) {
				//handle async errors in jwt
				return res.status(500).send({ message: "Failed to validate token" });
			}
			return res.status(200).send({ message: "AccessToken is Valid" });
		});
	} catch (err) {
		//catch will handle synchronous errors.
		return res.status(500).send({ message: "Failed to validate token" });
	}
}

function RefreshAccessToken(id, req, res) {
	console.log("trying to refresh access token");
	try {
		//sign w/ userId and return new accessToken
		let time = ACCESS_TOKEN_TIME;
		const accessToken = GenerateToken(id, time);
		console.log("new accessToken refreshed is: ", accessToken);
		return accessToken;
	} catch (error) {
		console.log("Failed to refresh AccessToken: ", error);
		throw error;
		//return res.status(500).send({ message: "Failed to refresh token" });
	}
}

function GenerateToken(id, time) {
	return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: time }); //30 mins
}

module.exports = { AuthenticateToken, IsTokenValid };
