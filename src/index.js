const express = require('express');
const bodyParser = require('body-parser');
const uri = 'mongodb+srv://mestockm:fridaypacker@cpi-310-final-jfkjr.mongodb.net/test?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const exphbs  = require('express-handlebars');

const app = express();
const port = 3000;

mongoose.connect(uri, { useNewUrlParser: true });

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(bodyParser.json())
app.use('/public', express.static("public"))

app.use('/students', require('./routes/students'));

app.get('/', (req, res) => {
  res.render('profile')
})

app.listen(port, function(){
  console.log(`We are listening at port ${port}`);
});
