import pg from 'pg';
import 'dotenv/config';
import bcrypt from 'bcyrpt';

const { Pool } = pg;

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: process.env.DB_URI
});

const dbController = {};

// creates a new user and returns the query's response 
dbController.addUser = async (req, res, next) => {
  // deconstruct relevant account info from request body
  const { username, email, password } = req.body;  
  // salt the password before adding it
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  
  // try to create the user
  try {
    const result = await pool.query(
      'INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );
    res.locals.user = result.rows[0];
    return next();
  } // if failed: send error to global error handler
  catch (err) {
    // username/email exists error
    if(err.code === '23505'){
      // grab the field that already exists
      const field = err.constraint.toString().split('_')[1];
      return next({
        log: `Error in dbController.addUser: ${err}`,
        status: 400,
        message: `Error: ${field} already exists!`
      })
    }
    // all other errors
    return next({
      log: `Error in dbController.addUser: ${err}`,
      status: 400,
      message: `An error occurred: ${err.message}`
    });
  }  
}

dbController.addFavoritePicture = async (req, res, next) => {
  // deconstruct the necessary data
  const { userId, pictureLink, pictureDate, title, description } = req.body;
  try {    
    const result = await pool.query(
      'INSERT INTO favorite_pictures(user_id, picture_link, picture_date, title, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [userId, pictureLink, pictureDate, title, description]
    );
    res.locals.addFavoritePicture = result.rows[0];
    return next();
  } // if there was problem adding the picture to gallery
  catch (err) {
    return next({
      log: `Problem in dbController.addFavoritePicture: ${err}`,
      status: 400,
      message: `An error occurred: ${err.message}`
    });
  }  
}

export default dbController;