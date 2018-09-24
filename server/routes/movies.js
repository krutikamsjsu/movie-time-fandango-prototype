var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/getMovies', function(req, res, next) {
    let moviesList= [];
    //var user_id= req.session.userID;
    let getMoviesList  = "select m.movieId, m.title, m.trailerLink, m.movieCharacters, m.releaseDate, m.photosUrl, m.movieLengthInMin, m.seeItIn, m.genre, m.minimumAge, m.description from Movies m";
    let errors='';

    mysql.fetchData(function(err,results){
        if(err){
            errors="Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if(results.length > 0) {
            let i = 0, movie={};
            while(i<results.length) {
                movie = {
                    movie_id: results[i].movieId,
                    title: results[i].title,
                    trailer_link : results[i].trailerLink,
                    movie_characters: results[i].movieCharacters,
                    release_date: results[i].releaseDate,
                    rating: results[i].rating,
                    photo:results[i].photosUrl,
                    movie_length: results[i].movieLengthInMin,
                    see_it_in: results[i].seeItIn,
                    genre:results[i].genre,
                    minimumAge:results[i].minimumAge
                };
                moviesList.push(movie);
                i++;
            }
            res.send(moviesList);
        }
    },getMoviesList);
});

router.get('/getHalls', function(req, res, next) {
    let hallsList = [];

    //var user_id= req.session.userID;
    let getHallsList = "select * from MovieHall";
    let errors = '';

    mysql.fetchData(function (err, results) {
        if (err) {
            errors = "Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if (results.length > 0) {
            let i = 0,hall={};
            while (i < results.length) {
                hall = {
                    hall_id: results[i].hallId,
                    name: results[i].hallName,
                    city: results[i].city,
                    state: results[i].state,
                    zipcode: results[i].zipcode,
                };
                hallsList.push(hall);
                i++;
            }
            res.send(hallsList);
        }
    }, getHallsList);
});

router.get('/getGenreList', function(req, res, next) {
    let genreList = [];

    //var user_id= req.session.userID;
    let getGenreList = "select distinct genre from Movies";
    let errors = '';

    mysql.fetchData(function (err, results) {
        if (err) {
            errors = "Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if (results.length > 0) {
            let i = 0;
            while (i < results.length) {
                genreList.push(results[i].genre);
                i++;
            }
            res.send(genreList);
        }
    }, getGenreList);
});

router.post('/addMovie', function(req, res) {
    let d = new Date(req.param("release_date"));
    let finDate = d.getFullYear() + '-0' + d.getMonth() + '-' + d.getDate();//+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
    if(req.param("action") == "add") {
        let getId = "select max(movieId) as maxCnt from Movies";
        console.log("insert Query is:" + getId);
        let errors = "Unable to process your request. Please try again in sometime.";
        mysql.fetchData(function (error, results) {
            if (error) {
                res.status(400).json({errors});
            }
            else {
                if (results.length > 0) {
                    let movie_id = results[0].maxCnt + 1;

                    let addMovie = "insert into Movies (movieId, title, trailerLink, movieCharacters, releaseDate, movieLengthInMin, seeItIn, genre, minimumAge, description, photosUrl)";
                    addMovie = addMovie + " values (" + movie_id + ",'" + req.param("title") + "','" + req.param("trailer_link") + "','" + req.param("movie_characters") + "','" + finDate + "'," + req.param("movie_length") + ",'" + req.param("see_it_in") + "','" + req.param("genre") + "'," + req.param("minimum_age") + ",'" + req.param("description") + "','" + req.param("image_url") + "')";
                    mysql.fetchData(function (err, results) {
                        if (err) {
                            res.status(400).json(errors);
                        }
                        else if (results.affectedRows > 0) {
                            res.send("Movie Added Successfully");
                        }
                    }, addMovie);

                }
            }
        }, getId);
    }
    else{
        let addMovie = "update Movies set title = '"+req.param("title")+"', trailerLink = '"+req.param("trailer_link")+"', movieCharacters = '"+req.param("movie_characters")+"', releaseDate = '"+finDate+"', movieLengthInMin = "+req.param("movie_length")+", seeItIn = '"+req.param("see_it_in")+"', genre = '"+req.param("genre")+"', minimumAge = '"+req.param("minimum_age")+"', description = '"+req.param("description")+"', photosUrl = '"+req.param("image_url")+"' where movieId = "+req.param("movie_id");
        //addMovie = addMovie + " values (" + movie_id + ",'" + req.param("title") + "','" + req.param("trailer_link") + "','" + req.param("movie_characters") + "','" + finDate + "'," + req.param("movie_length") + ",'" + req.param("see_it_in") + "','" + req.param("genre") + "'," + req.param("minimum_age") + ",'" + req.param("description") + "','" + req.param("image_url") + "')";
        mysql.fetchData(function (err, results) {
            if (err) {
                res.status(400).json(errors);
            }
            else if (results.affectedRows > 0) {
                res.send("Movie Edited Successfully");
            }
        }, addMovie);
    }
});


router.post('/rateNow', function(req, res) {
    let getId="select max(reviewId) as maxCnt from MovieReviews";
    console.log("insert Query is:"+getId);
    let errors="Unable to process your request. Please try again in sometime.";
    mysql.fetchData(function (error,results) {
        if(error){
            res.status(400).json({errors});
        }
        else{
            if(results.length > 0){
                let reviewId = results[0].maxCnt+1;
                let addReview="insert into MovieReviews (reviewId, userId, movieId, rating, review) values ("+reviewId+","+req.param("userId")+","+req.param("movieId")+","+req.param("rating")+",'"+req.param("review")+"')";
                mysql.fetchData(function (err, results) {
                    if (err) {
                        res.status(400).json(errors);
                    }
                    else if(results.affectedRows > 0){
                        res.send({message:"Rated"});
                    }
                }, addReview);

            }
        }
    },getId);
});

router.post('/addMovieToHall', function(req, res) {
    let getId="select max(hallMovieId) as maxCnt from HallMovieRelation";
    console.log("insert Query is:"+getId);
    let errors="Unable to process your request. Please try again in sometime.";
    mysql.fetchData(function (error,results) {
        if(error){
            res.status(400).json({errors});
        }
        else{
            if(results.length > 0){
                let hallMovieId = results[0].maxCnt+1;
                let addReview="insert into HallMovieRelation (hallMovieId, movieId, hallId, showTimings) values ("+hallMovieId+","+req.param("movieId")+","+req.param("hallId")+",'"+req.param("movie_times")+"')";
                mysql.fetchData(function (err, results) {
                    if (err) {
                        res.status(400).json(errors);
                    }
                    else if(results.affectedRows > 0){
                        res.send({message:"Rated"});
                    }
                }, addReview);

            }
        }
    },getId);
});

router.get('/getMoviesRevenue', function(req, res, next) {
    let revenueList= [];
    //var user_id= req.session.userID;
    let getRevenueList  = "select m.title, sum(b.amount)+sum(b.tax) as revenue from Movies m, Billing b where m.movieId = b.movieId and b.status = 'booked' and b.hallId = "+req.param("hall_id")+" group by b.movieId";
    let errors='';

    mysql.fetchData(function(err,results){
        if(err){
            errors="Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if(results.length > 0) {
            let i = 0, revenue={};
            while(i<results.length) {
                revenue = {
                    title: results[i].title,
                    revenue:results[i].revenue
                };
                revenueList.push(revenue);
                i++;
            }
            res.send(revenueList);
        }
    },getRevenueList);
});

router.get('/getMovieDetails', function(req, res, next) {
    let ratingList= [];
    //var user_id= req.session.userID;
    let getMovieDetails  = "select * from Movies where movieId = "+req.param("movie_id");
    let errors='';

    mysql.fetchData(function(err,results){
        if(err){
            errors="Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if(results.length > 0) {

            let getReviews  = "select m.reviewId,u.userId,m.rating,m.review,u.firstName,u.lastName from MovieReviews m, Users u where m.userId=u.userId and m.movieId = "+req.param("movie_id");
            mysql.fetchData(function(err,result){
                if(err){
                    errors="Unable to fetch movies list";
                    res.status(400).json(errors);
                }
                else{
                    let i=0, rating={};
                    console.log(JSON.stringify(result));
                    while(i<result.length){
                        rating = {
                            reviewId: result[i].reviewId,
                            userId:result[i].userId,
                            first_name:result[i].firstName,
                            last_name:result[i].lastName,
                            rating:result[i].rating,
                            review:result[i].review
                        };
                        console.log(rating.reviewId);
                        i++;
                        ratingList.push(rating);
                    }
                    var movie = {
                        movie_id:results[0].movieId,
                        title: results[0].title,
                        trailer_link:results[0].trailerLink,
                        characters:results[0].movieCharacters,
                        release_date:results[0].releaseDate,
                        movie_length:results[0].movieLengthInMin,
                        see_it_in:results[0].seeItIn,
                        genre:results[0].genre,
                        description:results[0].description,
                        minimum_age:results[0].minimumAge,
                        image_url:results[0].photosUrl,
                        ratingList : ratingList
                    };
                    res.send(movie);
                    //movie.ratingList = ratingList;
                }
            },getReviews);
        }
    },getMovieDetails);
});


module.exports = router;
