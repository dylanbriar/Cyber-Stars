import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import apiController from './apiController.js';
import cookieParser from 'cookie-parser';
import authController from './authController.js';
import dbController from './dbController.js';

const app = express();
const port = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// configure cors, json parsing and url encoding
const corsOptions = {
	origin: '*',
	credentials: true,
	optionalSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

//add in auth for sign in
app.post('/', authController.setCookie, (req, res) => {
  return res.status(302).redirect('/home');
});

app.put('/user', dbController.addUser, (req, res) => {
  return res.status(201).json(res.locals.user);
})	

//add in auth to verify user
app.get('/home', authController.verifyUser, (req, res) => {
  return res.sendFile(path.join(__dirname, '../index.html'));
});

// returns a link to an image, a rightAnswer and three wrong answers
app.get('/game', apiController.getImageAndAnswer, apiController.getOptions, (req, res) => {
  return res.status(200).json(res.locals);
  }
);

app.put('/gallery', dbController.addFavoritePicture, (req, res) => {
	return res.status(201).json({ favoritePicture: res.locals.favoritePicture });
});
  
// 404 handler (not really working)
app.use('*', (req, res) =>
	res.status(404).send('404 - This planet is in another galaxy!')
);

//global error handler
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 500,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign(defaultErr, err);
	console.log(errorObj.log);
	console.error(err);
	res.status(errorObj.status).send(errorObj.message);
});

app.listen(port, () => console.log(`Server listening on port ${port}...`));
