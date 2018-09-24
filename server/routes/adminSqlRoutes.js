var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

// Latest 10 Bills
router.get('/latest10Bills', function(req, res, next) {
  console.log(req.query);
  let userQuery = `select userId, userType, firstName from fandango.Users
                   where userId = ${req.query.userId}`;
  let sqlQuery = `Select b.billingId, b.date, b.ticketCount, b.amount, b.tax,
                  b.status, b.movieId, b.hallId, u.userId, u.userType, u.firstName, u.lastName
                  from fandango.Billing b inner join fandango.Users u
                  on b.userId = u.userId `;
  let orderBy = ` order by date desc limit 10 `;
  let andClause = ` AND u.userId = `;
  mysql.fetchData(function(err, userResult) {
     if(err) {
       res.status(400).json({error: "failed to fetch user purchase history"});
     } else if(userResult[0].userType === 2) {
       sqlQuery = sqlQuery + orderBy;
      } else {
        andClause = andClause + `${req.query.userId} `;
        sqlQuery = sqlQuery + andClause + orderBy;
      }
      mysql.fetchData(function(err, results) {
         if(err) {
           res.status(400).json({error: "Unable to fetch purchase history"});
         } else {
           res.status(200).json({result: results});
         }
       }, sqlQuery);
  }, userQuery);
});

// Search on the basis of date or month
router.get('/billSearch', function(req, res, next) {
  console.log(req.query);
  let userQuery = `select userId, userType, firstName from fandango.Users
                   where userId = ${req.query.userId}`;
  let sqlQuery = `Select b.billingId, b.date, b.amount, b.tax, b.ticketCount,
                  b.movieId, u.userId, u.userType, u.firstName, u.lastName from
                  fandango.Billing b inner join fandango.Users u
                  on b.userId = u.userId WHERE `;
  if ("date" in req.query) {
    sqlQuery = sqlQuery + ` b.date like "${req.query.date.concat("%")}" `;
  } else if("month" in req.query) {
    sqlQuery = sqlQuery + ` MONTH(date) = ${req.query.month} `;
  } else {
    res.status(401).json({error: "invalid query"});
  }
  mysql.fetchData(function(err, userResult) {
     if(err) {
       res.status(400).json({error: "failed to fetch user purchase history"});
     } else if(userResult[0].userType !== 2) {
       // if user is not admin then add userId to the where clause
       sqlQuery = sqlQuery + ` AND u.userId = ${req.query.userId}`;
      }
      mysql.fetchData(function(err, results) {
        if(err) {
          res.status(400).json({error: "Unable to fetch purchase history"});
        } else {
          res.status(200).json({result: results});
        }
      }, sqlQuery);
  }, userQuery);
});

// Bill Details
router.get('/getBill', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select b.billingId, u.userId, u.userType, u.firstName,
                  u.lastName, m.title, m.photosUrl, m.seeItIn, mh.hallName,
                  mh.city, mh.zipcode, b.amount, b.ticketCount,
                  (b.amount * b.ticketCount) as totalAmount, b.date from
                  Billing b inner join Users u on b.userId = u.userId
                  inner join MovieHall mh on mh.hallId = b.hallId
                  inner join Movies m on m.movieId = b.movieId
                  where b.BillingId=${req.query.billingId}`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the bill details"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

// Revenue by Movie
router.get('/getRevenueByMovie', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select m.title, sum(b.amount * b.ticketCount) as totalRevenue
                  from Billing b inner join Movies m on m.movieId = b.movieId
                  where b.movieId=${req.query.movieId} and b.status="booked" group by m.title`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

// Revenue by Hall
router.get('/getRevenueByHall', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select mh.hallName, sum(b.amount * b.ticketCount) as totalRevenue
                  from Billing b inner join MovieHall mh on mh.hallId = b.hallId
                  where mh.hallId=${req.query.hallId} and b.status="booked" group by mh.hallName`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

// 10 halls who sold maximum number of tickets last month with its revenue
router.get('/top10HallsWithMaxRevenue', function(req, res, next) {
  let sqlQuery = `Select mh.hallId, mh.hallName, sum(b.ticketCount) as totalTickets,
                  sum(b.amount  * b.ticketCount) as totalRevenue
                  from Billing b inner join MovieHall mh on mh.hallId = b.hallId
                  where mh.hallId in (Select mh.hallId from Billing b inner join
                  MovieHall mh on mh.hallId = b.hallId group by mh.hallId)
                  group by mh.hallId order by totalRevenue desc limit 10`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get the revenue of 10 halls with maximum revenue"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

// Top 10 movies with its revenue/year
router.get('/top10MovieRevenues', function(req, res, next) {
  let sqlQuery = `Select year(b.date) as curr_year, m.title, sum(b.amount * b.ticketCount) as totalRevenue
                  from Movies m inner join Billing b on m.movieId = b.movieId
                  group by year(b.date), m.title order by totalRevenue desc limit 10;`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the top 10 movie revenues"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

// City wise revenue/year (Bar, Pie or any kind of graph) for Movie, movieId is a parameter
router.get('/cityWiseRevenuePerYearForMovie', function(req, res, next) {
  console.log(`Movie Id: ${req.query.movieId}`);
  let sqlQuery = `Select mh.city, year(b.date) as curr_year, m.title,
                  sum(b.amount * b.ticketCount) as totalRevenue
                  from Movies m inner join Billing b on m.movieId = b.movieId
                  AND m.movieId = ${req.query.movieId} inner join MovieHall mh
                  on mh.hallId = b.hallId group by mh.city, curr_year, m.title
                  order by totalRevenue desc limit 10`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the city wise revenue per year for a movie"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

// Graph for reviews on Movies (Data from database)
router.get('/reviewsOnMovies', function(req, res, next) {
  let sqlQuery = `Select m.title, avg(rating) as avgRating
                  from Movies m inner join MovieReviews mr on m.movieId = mr.movieId
                  group by mr.movieId order by m.releaseDate desc limit 10`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to fetch the reviews for movies"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

module.exports = router;
