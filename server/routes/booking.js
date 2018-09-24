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
    let getMoviesList  = "select movie_id, title, trailer_link, movie_characters, release_date, rating, photo, movie_length, see_it_in, genre from movie";
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
                    movie_id: results[i].movie_id,
                    title: results[i].title,
                    trailer_link : results[i].trailer_link,
                    movie_characters: results[i].movie_characters,
                    release_date: results[i].release_date,
                    rating: results[i].rating,
                    photo:results[i].photo,
                    movie_length: results[i].movie_length,
                    see_it_in: results[i].see_it_in,
                    genre:results[i].genre
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
    let getHallsList = "select hall_id, name, from_time, to_time, number_of_tickets, screen_number, ticket_price from movie_hall";
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
                    hall_id: results[i].hall_id,
                    name: results[i].name,
                    to_time: results[i].to_time,
                    from_time: results[i].from_time,
                    number_of_tickets: results[i].number_of_tickets,
                    screen_number: results[i].screen_number,
                    ticket_price: results[i].ticket_price,
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
    let getGenreList = "select distinct genre from movie";
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
    let getId="select max(movie_id) as maxCnt from movie";
    console.log("insert Query is:"+getId);
    let errors="Unable to process your request. Please try again in sometime.";
    mysql.fetchData(function (error,results) {
        if(error){
            res.status(400).json({errors});
        }
        else{
            if(results.length > 0){
                let movie_id = results[0].maxCnt+1;
                let d = new Date(req.param("release_date"));
                let finDate = d.getFullYear()+'-0'+d.getMonth()+'-0'+d.getDate();//+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
                let addMovie = "insert into movie (movie_id, title, trailer_link, movie_characters, release_date, movie_length, see_it_in, genre)";
                addMovie = addMovie + " values ('"+movie_id+"','"+req.param("title")+"','"+req.param("trailer_link")+"','"+req.param("movie_characters")+"','"+finDate+"','"+req.param("movie_length")+"','"+req.param("see_it_in")+"','"+req.param("genre")+"')";
                mysql.fetchData(function (err, results) {
                    if (err) {
                        res.status(400).json(errors);
                    }
                    else if(results.affectedRows > 0){
                        res.send("Movie Added Successfully");
                    }
                }, addMovie);

            }
        }
    },getId);
});

router.get('/cancelBooking', function(req, res, next) {
    let cancelBooking  = "update Billing set status='cancelled' where billingId = "+req.param('billing_id');
    let errors='';

    mysql.fetchData(function(err,results){
        if(err){
            errors="Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else{
            res.send({message:"Booking Cancelled."});
        }
    },cancelBooking);
});

router.get('/getBookedMovieUserList', function(req, res, next) {
    let bookingList= [];
    //var user_id= req.session.userID;
    let getBookingDetails  = "select u.userId, u.firstName, u.lastName, b.billingId from Billing b, Users u where b.movieId = 1 and b.hallId = 1 and b.userId=u.userId and b.status='booked'";
    let errors='';

    mysql.fetchData(function(err,results){
        if(err){
            errors="Unable to fetch movies list";
            res.status(400).json(errors);
        }
        else if(results.length > 0) {
            let i = 0, user={};
            while(i<results.length) {
                user = {
                    user_id:results[i].userId,
                    name: results[i].firstName+" "+results[i].lastName,
                    billing_id: results[i].billingId
                };
                bookingList.push(user);
                i++;
            }
            res.send(bookingList);
        }
    },getBookingDetails);
});

module.exports = router;