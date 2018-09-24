var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addMovieHall', function(req, res){

    console.log("Inside add Movie Hall!!!!!");
    console.log("hallName", req.param("hallName"));
    console.log("t1", req.param("t1"));
    console.log("t2", req.param("t2"));
    console.log("t3", req.param("t3"));
    console.log("nTickets", req.param("nTickets"));
    console.log("nScreens", req.param("nScreens"));
    console.log("tPrice", req.param("tPrice"));
    var t1,t2,t3 = "";
    var movie_times = "";
    if(req.param("t1")+""!="undefined")
    {
        t1 = req.param("t1");
        movie_times = t1;
    }
    if(req.param("t2")+""!="undefined")
    {
        t2 = req.param("t2");
        if(movie_times!="")
            movie_times = movie_times +"|"+t2;
        else
            movie_times = t2;
    }
    if(req.param("t3")+""!="undefined")
    {
        t3 = req.param("t3");
        if(movie_times!="")
            movie_times = movie_times +"|"+t3;
        else
            movie_times = t3;
    }

    console.log("movie times",movie_times);
    var getMaxUId = "select max(userId) as maxCnt from fandango.Users";
    var errors;
    console.log("max Query is:" + getMaxUId);
    mysql.fetchData(function (error,results) {
        console.log("Inside fetch data");
        if(error){
            errors="Unable to process request";
            res.status(400).json(errors);
        }
        else{
            if(results.length > 0){
                hall_id= results[0].maxCnt+1;
                //var addMvHall="INSERT INTO fandango_schema.movie_hall(hall_id,hall_name,movie_times,number_of_tickets,screen_number,ticket_price) VALUES ( "+hall_id+","+"'"+req.param("hallName")+"'"+","+"'"+movie_times+"'"+","+req.param("nTickets")+","+req.param("nScreens")+","+req.param("tPrice")+")";
                var user_id = results[0].maxCnt + 1;
                var addHallAdmin = "INSERT INTO fandango.Users(userId,userType,password,firstName,lastName,address,city,state,zipcode,phoneNumber,email) VALUES ( " + user_id + "," +1+ "," + "'" + req.param("fName") + "'" + "," + "'" + req.param("fName") + "'" + "," + "'" + req.param("lName") + "'"+","+"'"+req.param("address")+"'"+","+"'"+req.param("city")+"'"+","+"'"+req.param("state")+"'"+","+req.param("zipcode")+","+req.param("phoneNumber")+","+"'"+req.param("email")+"'"+")";
                console.log("inserted" + JSON.stringify(results));
                mysql.fetchData(function (error,results) {
                    if(error){
                        errors="Unable to add project at this time."
                        res.status(400).json({error});
                    }
                    else{
                        if(results.affectedRows > 0) {
                            var getMaxId="select max(hallId) as maxCnt from fandango.MovieHall";
                            var errors;
                            console.log("max Query is:"+getMaxId);
                            mysql.fetchData(function (error, results) {
                                console.log("Inside fetch data");
                                if (error) {
                                    errors = "Unable to process request";
                                    res.status(400).json(errors);
                                }
                                else {
                                    if (results.length > 0) {
                                        var hall_id = results[0].maxCnt + 1;
                                        var addMvHall="INSERT INTO fandango.MovieHall(hallId,hallName,movieTimes,numberOfTickets,numberOfScreens,ticketPrice, movieHallAdminId) VALUES ( "+hall_id+","+"'"+req.param("hallName")+"'"+","+"'"+movie_times+"'"+","+req.param("nTickets")+","+req.param("nScreens")+","+req.param("tPrice")+","+user_id+")";
                                        console.log("insert Query is:  "+addMvHall);

                                        mysql.fetchData(function (error, results) {
                                            if (error) {
                                                errors = "Unable to add project at this time."
                                                res.status(400).json({error});
                                            }
                                            else {
                                                if (results.affectedRows > 0) {
                                                    //res.status(200).json({status:"OK"});
                                                    res.send("Movie Hall added to the system successfully and also allocated to hall admin");
                                                }
                                            }
                                        }, addMvHall)
                                    }                                }
                            },getMaxId)
                        }
                    }
                },addHallAdmin);
            }
        }
    },getMaxUId);
	//res.send("Movie Hall added Successfully");
});


router.post('/searchMovieHall', function(req, res){
    console.log("Inside search Movie Hall");
    console.log("request :: ",req.param("searchStr"));
    //var searchMvHall="select * from fandango_schema.movie_hall where hall_name = "+"'"+req.param("searchStr")+"'";
    var searchMvHall="select m.hallId, m.hallName, m.movieTimes,m.numberOfTickets, m.numberOfScreens, m.ticketPrice, m.movieHallAdminId, u.userType, u.firstName, u.lastName, u.address, u.city, u.state, u.zipcode, u.phoneNumber, u.email from fandango.MovieHall m, fandango.Users u where m.movieHallAdminId = u.userId and m.hallName = "+"'"+req.param("searchStr")+"'";
    console.log("search Query is:  "+searchMvHall);
    mysql.fetchData(function (error,results) {
        if(error){
            errors="Unable to search movie hall at this time."
            res.status(400).json({error});
        }
        else{
            if(results.length > 0){
                var hallData = {
                    hall_id : results[0].hallId,
                    hallName : results[0].hallName,
                    movie_times : results[0].movieTimes,
                    nTickets : results[0].numberOfTickets,
                    nScreens : results[0].numberOfScreens,
                    tPrice : results[0].ticketPrice,
                    mvHallAdminId : results[0].movieHallAdminId,
                    userType : results[0].userType,
                    fName : results[0].firstName,
                    lName : results[0].lastName,
                    address : results[0].address,
                    city : results[0].city,
                    state : results[0].state,
                    zipcode : results[0].zipcode,
                    phoneNumber : results[0].phoneNumber,
                    email : results[0].email
                };
                console.log("hall Data",hallData);
                console.log("movie id after if",results[0].hallId);
                console.log("movie hallName after if",results[0].hallName);
                console.log("movie movie_times after if",results[0].movie_times);

                //res.status(200).json({status:"OK"});
                res.send(hallData);
            }
        }
    },searchMvHall);
});

router.post('/updateMovieHall', function(req, res){
    console.log("Inside update Movie Hall");
    console.log("hallName", req.param("hallName"));
    console.log("t1", req.param("t1"));
    console.log("t2", req.param("t2"));
    console.log("t3", req.param("t3"));
    console.log("nTickets", req.param("nTickets"));
    console.log("nScreens", req.param("nScreens"));
    console.log("tPrice", req.param("tPrice"));
    var t1,t2,t3 = "";
    var movie_times = "";
    if(req.param("t1")+""!="undefined")
    {
        t1 = req.param("t1");
        movie_times = t1;
    }
    if(req.param("t2")+""!="undefined")
    {
        t2 = req.param("t2");
        if(movie_times!="")
            movie_times = movie_times +"|"+t2;
        else
            movie_times = t2;
    }
    if(req.param("t3")+""!="undefined")
    {
        t3 = req.param("t3");
        if(movie_times!="")
            movie_times = movie_times +"|"+t3;
        else
            movie_times = t3;
    }
    console.log("movie times",movie_times);
    console.log("movie times before update", req.param("movieTimesBfr"));
    var data = {};
    var updateMvHall="UPDATE fandango.MovieHall SET hallName = "+"'"+req.param("hallName")+"'"+", movieTimes = "+"'"+movie_times+"'"+",numberOfTickets = "+req.param("nTickets")+",numberOfScreens = "+req.param("nScreens")+",ticketPrice = "+req.param("tPrice")+" WHERE hallId = "+req.param("hall_id");
    console.log("update Query is:  "+updateMvHall);
    mysql.fetchData(function (error,results) {
        if(error){
            errors="Unable to add project at this time."
            res.status(400).json({error});
        }
        else{
            if(results.affectedRows > 0){
                console.log("updated"+JSON.stringify(results));
                var updateAdminData="UPDATE fandango.Users SET firstName = "+"'"+req.param("fName")+"'"+", lastName = "+"'"+req.param("lName")+"'"+", address= "+"'"+req.param("address")+"'"+", city= "+"'"+req.param("city")+"'"+", state= "+"'"+req.param("state")+"'"+", zipcode= "+req.param("zipcode")+", phoneNumber= "+req.param("phoneNumber")+", email= "+"'"+req.param("email")+"'"+" WHERE userId = "+req.param("mvHallAdminId");
                console.log("update Query is:  "+updateAdminData);
                mysql.fetchData(function (error,results) {
                    if(error){
                        errors="Unable to update admin data at this time."
                        res.status(400).json({error});
                    }
                    else{
                        if(results.affectedRows > 0){
                            console.log("updated"+JSON.stringify(results));
                            var getUpdatedHall="select m.hallId, m.hallName, m.movieTimes,m.numberOfTickets, m.numberOfScreens, m.ticketPrice, m.movieHallAdminId, u.userType, u.firstName, u.lastName, u.address, u.city, u.state, u.zipcode, u.phoneNumber, u.email from fandango.MovieHall m, fandango.Users u where m.movieHallAdminId = u.userId and m.hallName = "+"'"+req.param("hallName")+"'";
                            console.log("search Query is:  "+getUpdatedHall);
                            mysql.fetchData(function (error,results) {
                                if(error){
                                    errors="Unable to search movie hall at this time."
                                    res.status(400).json({error});
                                }
                                else{
                                    if(results.length > 0){
                                        var hallData = {
                                            hall_id : results[0].hallId,
                                            hallName : results[0].hallName,
                                            movie_times : results[0].movieTimes,
                                            nTickets : results[0].numberOfTickets,
                                            nScreens : results[0].numberOfScreens,
                                            tPrice : results[0].ticketPrice,
                                            mvHallAdminId : results[0].movieHallAdminId,
                                            userType : results[0].userType,
                                            fName : results[0].firstName,
                                            lName : results[0].lastName,
                                            address : results[0].address,
                                            city : results[0].city,
                                            state : results[0].state,
                                            zipcode : results[0].zipcode,
                                            phoneNumber : results[0].phoneNumber,
                                            email : results[0].email
                                        };

                                        var data = {
                                            message : "Movie Hall details updated Successfully",
                                            hallData : hallData
                                        };
                                        //res.status(200).json({status:"OK"});
                                        res.send(data);
                                    }
                                }
                            },getUpdatedHall);
                        }
                    }
                },updateAdminData);
            }
        }
    },updateMvHall);
});

router.post('/deleteMovieHall', function(req, res){
    console.log("Inside delete Movie Hall");
    console.log("hallId", req.param("hall_id"));
    /*console.log("hallName", req.param("hallName"));
    console.log("t1", req.param("t1"));
    console.log("t2", req.param("t2"));
    console.log("t3", req.param("t3"));
    console.log("nTickets", req.param("nTickets"));
    console.log("nScreens", req.param("nScreens"));
    console.log("tPrice", req.param("tPrice"));
    var t1,t2,t3 = "";
    var movie_times = "";
    if(req.param("t1")+""!="undefined")
    {
        t1 = req.param("t1");
        movie_times = t1;
    }
    if(req.param("t2")+""!="undefined")
    {
        t2 = req.param("t2");
        if(movie_times!="")
            movie_times = movie_times +"|"+t2;
        else
            movie_times = t2;
    }
    if(req.param("t3")+""!="undefined")
    {
        t3 = req.param("t3");
        if(movie_times!="")
            movie_times = movie_times +"|"+t3;
        else
            movie_times = t3;
    }
    console.log("movie times",movie_times);
    console.log("movie times before update", req.param("movieTimesBfr"));*/
    var data = {};
    var deleteMvHall="DELETE from fandango.MovieHall WHERE hallId = "+req.param("hall_id");
    console.log("delete Query is:  "+deleteMvHall);
    mysql.fetchData(function (error,results) {
        if(error){
            errors="Unable to add project at this time.";
            res.status(400).json({error});
        }
        else{
            if(results.affectedRows > 0){
                console.log("deleted"+JSON.stringify(results));
                var hallData = {
                    hall_id : req.param("hall_id"),
                    hallName : req.param("hallName")
                };
                var data = {
                    message : "Movie Hall deleted Successfully",
                    hallData : hallData
                };
                        //res.status(200).json({status:"OK"});
                        res.send(data);
            }
        }

    },deleteMvHall);
});

module.exports = router;
