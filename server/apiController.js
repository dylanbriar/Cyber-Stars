//example http request https://api.nasa.gov/planetary/apod?date=2024-03-02&api_key=hYRkkhJCfl5dL7i00EB74UeqpgUqV3RH5Pgn6qPJ
//grab api key
import 'dotenv/config';
import fetch from 'node-fetch';
const apiKey = process.env.API_KEY;

//initialize apiController object to export
const apiController = {};

//get an image to display (for both home and archive)
apiController.getImageAndAnswer = (req, res, next) => {
  const date = req.body.date ? req.body.date : new Date().toISOString().substring(0,10);
  fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`)
    .then(res => res.json())
    //send back the image url for source and the title for the answer
    .then(data => {
      console.log(data)
      res.locals.imageUrl = data.hdurl;
      res.locals.rightAnswer = data.title;
      res.locals.description = data.explanation;
      return next();
    })    
    .catch(err => next({
      log: `Problem in api controller get function: ${err}`,
      status: 404,
      message: `An error occured: ${err}`
    }))
}


apiController.getOptions = (req, res, next) => {
  //generate today's date for the math
  const today = new Date()
  //generate a random year between when the API dates back to (2015) and the year before the current year
  const randomYear = 2015 + Math.floor(Math.random() * (today.getFullYear() - 2015))
  //get a random month, between Jan and Nov
  const startMonth = Math.floor(Math.random() * 11) + 1
  //find a random day (account for feb by capping at 28)
  const randomDay = Math.floor(Math.random() * 28) + 1
  //set the range; this is getting the range of one month
  const start_date = `${randomYear}-${startMonth}-${randomDay}`
  const end_date= `${randomYear}-${startMonth + 1}-${randomDay}`
  //fetch the whole range
  fetch(`https://api.nasa.gov/planetary/apod?start_date=${start_date}&end_date=${end_date}&api_key=${apiKey}`)
    .then(res => res.json())
    //send back the image url for source and the title for the answer
    .then(data => {
      //get random indexes, determined by 28/3
      const firstRandomIndex = Math.floor(Math.random() * 9)
      const secondRandomIndex = firstRandomIndex + Math.ceil(Math.random() * 10)
      const thirdRandomIndex = secondRandomIndex + Math.ceil(Math.random() * 10)
      //send back the options determined randomly
      res.locals.firstOption = data[firstRandomIndex].title;
      res.locals.secondOption = data[secondRandomIndex].title;
      res.locals.thirdOption = data[thirdRandomIndex].title;
      console.log(JSON.stringify(res.locals));
      return next();
    })    
    .catch(err => next({
      log: `Problem in api controller get function: ${err}`,
      status: 404,
      message: `An error occured: ${err}`
    }))
}

export default apiController;