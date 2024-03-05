import express from 'express';
import cors from 'cors';
import apiController from './apiController.js';
const app = express();
const port = 8080;

// configure cors, json parsing and url encoding
const corsOptions = {
    origin: '*',
    credentials: true,
    optionalSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// returns a link to an image, a rightAnswer and three wrong answers
app.get('/game', apiController.getImageAndAnswer, apiController.getOptions, (req, res) => {  
  return res.status(200).json(res.locals);
});

// 404 handler (not really working)
app.use('*', (req, res) => res.status(404).send('404 - This planet is in another galaxy!'));

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