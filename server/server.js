// TODO: make this work.
// if you go to localhost:3000 the app
// there is expected crud to be working here
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// express.static will serve everything
// with in client as a static resource
// also, it will serve the index.html on the
// root of that directory on a GET to '/'
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can access data we post on as req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
//GET all lions
app.get('/lions', function (req, res){
	res.json(lions);
});

//GET lion by id (lodash)
app.get('/lions/:id', function(req, res){
  var lion = _.find(lions, {id: req.params.id});
  res.json(lion || {});
});

//POST create a new lion
app.post('/lions', function (req, res){
	var lion = req.body;
	id++;
	lion.id = id + '';

	lions.push(lion);

	res.json(lion);
});

//PUT update matching lion 
app.put('/lions/:id', function (req, res){
	var update = req.body;

	if (update.id){
		delete update.id;
	}

	var lion = _.find(lions, {id: req.params.id});

	if (!lion[lion]){
		res.send();
	} 

	else{
		var updatedLion = _.assign(lions[lion], update);
		res.json(updatedLion);
	}
});

app.delete('/lions/:id', function(req, res){
	var lion = _.find(lions, {id: req.params.id});

	if(!lions[lion]){
		res.send();
	}
	else{
		var deletedLion = lions[lion];
		lions.splice(lion, 1)
		res.json(deletedLion);
	}
});

app.listen(3000);
console.log('on port 3000');
