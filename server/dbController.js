import pg from 'pg';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const { Pool } = pg;

// create and export new pool here using the connection string above
export const pool = new Pool({
  connectionString: process.env.DB_URI
});

// create a controller to later export
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
    // this also returns the hashes password as of right now. refactor?
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

dbController.addToGallery = async (req, res, next) => {
  const { pictureLink, pictureDate, title, description } = req.body;
  const username = req.cookies.token;
  try {
    // First, get the user ID based on the username
    const userResult = await pool.query('SELECT id FROM users WHERE username = $1', [username]);
    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }
    const userId = userResult.rows[0].id;
    // Then, insert into the gallery
    const galleryResult = await pool.query(
      'INSERT INTO gallery(user_id, picture_link, picture_date, title, description) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [userId, pictureLink, pictureDate, title, description]
    );
    res.locals.addedPicture = galleryResult.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `Error in dbController.addToGallery: ${err}`,
      status: 400,
      message: `An error occurred: ${err.message}`
    });
  }
}

dbController.retrieveGallery = async (req, res, next) => {
  try {    
    const username = req.cookies.token;
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    res.locals.pictures = result.rows;
    console.log(res.locals.pictures);
    
  } // if there was problem adding the picture to gallery
  catch (err) {
    return next({
      log: `Problem in dbController.addToGallery: ${err}`,
      status: 400,
      message: `An error occurred: ${err.message}`
    });
  }  
}

export default dbController;