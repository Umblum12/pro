const express = require(`express`);
const path = require(`path`);
const morgan = require(`morgan`);
const app = express();

//setting
app.set('port',3000);
app.set('views', path.join(__dirname,"views"));
app.set('views engine', 'ejs');

//middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({extended: "false"}));
app.use(express.json());

//Routes
app.use(require('./routes/routes'));

//statics
app.use(express.static(path.join(__dirname,"public")));

module.exports=app;
