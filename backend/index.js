const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

connectToMongo();

const app = express()
const port = 3001

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static('client/build'))
app.get('/*', (req, res)=>{
  res.sendFile(__dirname, 'client/build/index.html')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})