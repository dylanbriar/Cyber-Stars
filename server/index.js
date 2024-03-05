import express from 'express';
import cors from 'cors';
const app = express();
const port = 8080;

// configure cors, json parsing and url encoding
const corsOptions = {
    origin: '*',
    credentials: true,
    optionalSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json());

app.use('/hello', (req, res) => {
  console.log('world');  
  return res.status(200).send({message:'world'});
})

app.use('*', (req, res) => res.status(404).send('404 - This planet is in another galaxy!'));

app.listen(port, () => console.log(`Server listening on port ${port}...`));