var express = require('express');
var algoliasearch = require('algoliasearch');
var bodyParser = require('body-parser')
var path = require('path')

var fetch = require('./api-call');

var app = express();

// const port = process.env.PORT || 3000;

// Serve any static files built by React
app.use(express.static(path.join(__dirname, "client/build")));

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// create application/json parser
var jsonParser = bodyParser.json()

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.post('/api/send', jsonParser , function(req, res, next) {

    const {netoWebsiteURL, netoAPIUsername, netoAPIKey, algoliaAppID, algoliaAPIKey, algoliaIndex}  = req.body

    let records = fetch.fetchDataFromDatabase(netoWebsiteURL, netoAPIUsername, netoAPIKey)
   
    records.then(response => {
    
      var client = algoliasearch(`${algoliaAppID}`, `${algoliaAPIKey}`);
      var index = client.initIndex(`${algoliaIndex}`);

      // Format JSON to comply with Algolia standards
      // Add Object ID's to all records
      // Object ID == SKU-{usergroup}
      // Filter child SKUs by looking at Parent SKU

      sanitisedRecords = fetch.sanitise(response.data.Item, netoWebsiteURL)

      // Use reduce to compare sanitised records with existing records
      // existingRecords = sanitise(records);
      
      // Update existing records
      // Add new records 
      // Remove old records
      
      if (response.data.Item.length < 1000){
        index.addObjects(sanitisedRecords);
      } else {
        // Batch Job  
      }
      
      res.json(sanitisedRecords);

    })
    .catch(function (error) {
      console.log(error);
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// app.listen(4000, () => console.log('Example app listening on port 4000!'))
