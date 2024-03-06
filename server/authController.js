import { pool } from './dbController.js';
import bcrypt from 'bcrypt';
const authController = {};

// login a user
authController.login = async (req, res, next) => {
	console.log('in login function');
	const { username, password } = req.body;	
	console.log('username:',username,'--- password:',password);
	
	try {
		// find user based on login username
		const query = 'SELECT * FROM users WHERE username = $1';
		const result = await pool.query(query,[username]);
		// console.log(JSON.stringify(result));
		if (result.rows.length > 0) {
			const user = result.rows[0];
			// check if the input password matches the salted and hashed one in the database
			const match = await bcrypt.compare(password, user.password);
			// console.log('match:',match);
			if(match) {
				// move on to next middleware function (setCookie)				
				res.locals.cookie = username;
				return next();
			}
		}
		return next({
			log: `Error in authController.login: Invalid credentials`,
			status: 401,
			message: 'Invalid credentials!'
		})
	} // if an error happened 
	catch (err) {
		return next({
			log: `Error in authController.login: ${err}`,
			status: 400,
			message: `An error occurred: ${err.message}`
		});
	}
}

//setting a cookie:
authController.setCookie = (req, res, next) => {
	console.log('entered setcookie');
	console.log(res.locals.cookie)
	//console.log('username:', username, '--- password:', password);
	if(res.locals.cookie) {
		res.cookie('token', res.locals.cookie, { httpOnly: true, sameSite: 'Lax' });
	} else {
		return res.send('Unsuccessful login attempt');
	}
	return next();
};

//verifying a user:
authController.verifyUser = (req, res, next) => {
	const { cookies } = req;
	//destructure token from req.cookies?
	console.log('cookie: ',cookies);
	// if (cookies['token'] !== 'spaceCadet' || cookies['token'] === 'otherUser') {
	// 	return res.send('You must be signed in to view this page');
	// }
	return next();
};

export default authController;
