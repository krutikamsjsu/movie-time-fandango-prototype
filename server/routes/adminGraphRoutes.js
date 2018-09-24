var express = require('express');
var router = express.Router();
var pageClickModel = require('../models/PageClicks');
var movieClickModel = require('../models/MovieClicks');

router.get('/getPageClicks', function(req, res, next) {
  try {
    pageClickModel.findOne({},
          {_id: 0},
          function (err, result) {
              if (err) {
                console.log("getPageClicks error: " + err);
                throw err;
              }
              console.log("Data: " + JSON.stringify(result));
              if (result !== null) {
                  res.status(200).json({message: `page clicks data`, result: result});
              }
              else {
                res.status(401).json({error: `failed to get page clicks data`});
              }
         }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});

router.get('/getMovieClicks', function(req, res, next) {
  try {
    movieClickModel.find({},
          {_id: 0, __v: 0},
          function (err, results) {
              if (err) {
                console.log("getPageClicks error: " + err);
                throw err;
              }
              console.log("Data: " + JSON.stringify(results));
              if (results !== null) {
                  res.status(200).json({message: `movie clicks data`, result: results});
              }
              else {
                res.status(401).json({error: `failed to get movie clicks data`});
              }
         }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});


router.post('/updatePageClick', function(req, res, next) {
  console.log("Page Details: " + JSON.stringify(req.body));
  var updateData = {};
  updateData[req.body.page] = 1;
  console.log("update: " + JSON.stringify(updateData));
  try {
      pageClickModel.findOneAndUpdate({},
            {$inc: updateData},
            {new: true},
            function (err, result) {
                if (err) {
                  console.log("updatePageClick error: " + err);
                  throw err;
                }
                if (result !== null) {
                    console.log("updated data: " + JSON.stringify(result));
                    res.status(200).json({message: `${req.body.page} updated successully`, result: result});
                }
                else {
                  res.status(401).json({error: `failed to update click for: ${req.body.page}`});
                }
           }
      );
   } catch (error) {
     res.status(400).json({error: error});
   }
});

router.post('/updateMovieClick', function (req, res) {
  console.log("Movie Details: " + JSON.stringify(req.body));
  try {
    movieClickModel.findOneAndUpdate(
              {movieId: req.body.movieId},
              {$inc: {clicks: 1}},
              {new: true},
              async (err, result) => {
                  if (err) {
                    console.log("updateMovieClick findOne error: " + err);
                    throw err;
                  }
                  console.log("Data: " + JSON.stringify(result));
                  if (result !== null) {
                    console.log("updated entry: " + JSON.stringify(result));
                    res.status(200).json({result: result});
                  }
                  else {
                    const movieClickData = new movieClickModel({
                                                          movieId: req.body.movieId,
                                                          title: req.body.title
                                                        });
                    console.log("Creating new entry: " + JSON.stringify(movieClickData));
                    await movieClickData.save()
                    res.status(201).json({result: movieClickData});
                  }
          }
    );
  } catch (error) {
    res.status(400).json({error: error});
  }
});

module.exports = router;
