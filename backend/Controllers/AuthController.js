const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const ACCESS_TOKEN_TIME = "15s";

async function Login(req, res) {
	//Take in username and password to authenticate user.
	//if valid, return an accessToken and refreshToken
	let userName = req.body.userName;
	let password = req.body.password;
	try {
		const user = await User.findOne({
			where: { userName, password },
		});

		if (user) {
			console.log("User ID:", user.id);
			console.log("Username:", user.userName);
			console.log("Email:", user.email);

			//sign w/ userId and return new accessToken
			let time = ACCESS_TOKEN_TIME;
			const accessToken = GenerateToken(user.id, time);
			const refreshToken = GenerateToken(user.id);
			return res.status(200).send({ message: "Found User", accessToken, refreshToken });
		}
	} catch (error) {
		console.error("Error finding user:", error);
		return res.status(500).send({ message: "Failed to find user with those credentials" });
	}
}

async function Register(req, res) {
	try {
		console.log("req: ", req.body);
		let userName = req.body.userName;
		let firstName = req.body.firstName;
		let lastName = req.body.lastName;
		let password = req.body.password; //these 3 are required

		let birthday = req.body.birthday;
		let age = req.body.age;
		const newUser = await User.create({ userName, firstName, lastName, password, birthday, age });
		let time = "15s";
		//const accessToken = GenerateToken(newUser.id, time);
		let id = newUser.id;
		const accessToken = jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: time }); //idk why I can't call generateToken here
		const refreshToken = jwt.sign({ id }, process.env.TOKEN_SECRET);
		return res.status(201).send({ message: "Created new user", accessToken, refreshToken });
	} catch (error) {
		console.log(error);
		return res.status(500).send("Database creation of new user failed");
	}
}

function GenerateToken(id, time) {
	if (time) return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: time }); //30 mins
	return jwt.sign({ id }, process.env.TOKEN_SECRET);
}

async function ClearDB(req, res) {
	await User.destroy({
		where: {
			firstName: "Ethan",
		},
	});
	return res.status(200).send({ message: "Deleted uiser" });
	//User.truncate(); //this should empty table
}

module.exports = { Register, ClearDB, Login };
