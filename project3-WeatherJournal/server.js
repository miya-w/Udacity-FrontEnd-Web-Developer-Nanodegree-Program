// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require('express');
const app = express();


//Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dependency
const cors = require('cors');
app.use(cors());

// *alternative -> 
// app.use(express.static('__filename + "/index.html'));
app.use(express.static('web'));


const port = 5050;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server running on http://localhost:${port}`);
    console.log("server is running")
}


// Create GET route for url /AllData
app.get('/allData', function (request, response) {
  response.send(projectData);
  console.log(projectData)
})

// Create POST route
const data = []
app.post('/addData', addData);

function addData(request, response) {
  let data = request.body;
  projectData['date'] = data.date;
  projectData['temp'] = data.temperature;
  projectData['content'] = data.description;
  projectData['city'] = data.city;
  projectData['icon'] = data.icon;
  projectData['focus'] = data.focus;
  response.send(projectData);
  console.log(data)
}

