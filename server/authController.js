const authController = {};

//setting a cookie:
authController.setCookie = (req, res, next) => {
	const { user, pass } = req.body;
	if (user === 'spaceCadet' && pass === 'ilovespace') {
		res.cookie('token', 'spaceCadet');
	} else if (user === 'otherUser' && pass === 'ilikespace') {
		res.cookie('token', 'otherUser');
	} else {
		return res.send('Unsuccessful login attempt');
	}
	return next();
};

//verifying a user:
authController.verifyUser = (req, res, next) => {
	const { cookies } = req;
	//destructure token from req.cookies?
	console.log(cookies);
	if (cookies['token'] !== 'spaceCadet' || cookies['token'] === 'otherUser') {
		return res.send('You must be signed in to view this page');
	}
	return next();
};

export default authController;
