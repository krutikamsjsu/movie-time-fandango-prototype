var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/addMovieHall', function(req, res){

    console.log("Inside add Movie Hall");

    var getMaxId="select max(hall_id) as maxCnt from fandango_schema.movie_hall";
    var errors;
    console.log("max Query is:"+getMaxId);
    /*mysql.fetchData(function (error,results) {
        console.log("Inside fetch data");
        if(error){
            errors="Unable to process request";
            res.status(400).json(errors);
        }
        else{
            if(results.length > 0){
                hall_id= results[0].maxCnt+1;
                var addMvHall="INSERT INTO fandango_schema.movie_hall(hall_id,movie_times,number_of_tickets,screen_number,ticket_price) VALUES ( "+hall_id+"','"+req.param("movie_times")+"','"+req.param("number_of_tickets")+"','"+req.param("screen_number")+"','"+req.param("ticket_price");
                console.log("insert Query is:  "+addMvHall);
                mysql.fetchData(function (error,results) {
                    if(error){
                        errors="Unable to add project at this time."
                        res.status(400).json({error});
                    }
                    else{
                        if(results.affectedRows > 0){
                            console.log("inserted"+JSON.stringify(results));
                            //res.send("Movie Hall added Successfully");
                        }
                    }
                },addMvHall);
            }
        }
    },getMaxId);*/
	res.send("Movie Hall added Successfully");
});


router.get('/searchMovieHall', function(req, res){
    console.log("Inside search Movie Hall");
    /*var list= [];
    var data = {
        bList: []
    };
    var project_id= req.param("project_id");

    var getProjectList="select u.user_id, b.project_id, u.profile_image, u.name, b.bid_price, b.period_in_days";
    getProjectList= getProjectList + " from freelancer_prototype_db.user u, freelancer_prototype_db.bid b ";
    getProjectList= getProjectList + " where b.user_id = u.user_id and b.project_id = "+project_id;

    console.log(getProjectList);
    mysql.fetchData(function(err,results){
        if(results.length > 0) {
            var i = 0;
            while(i<results.length) {
                var project = {
                    user_id : results[i].user_id,
                    project_id : results[i].project_id,
                    profile_image: results[i].profile_image,
                    name: results[i].name,
                    bid_price: results[i].bid_price,
                    period_in_days: results[i].period_in_days
                }
                list.push(project);
                i++;
            }
            data.bList = list;
            res.send(data);
        }
    },getProjectList);*/
});

router.get('/updateMovieHall', function(req, res){
    console.log("Inside update Movie Hall");
    /*var list= [];
    var data = {
        bList: []
    };
    var user_id= req.session.userID;
    var getProjectList = "select p.project_id, u.user_id, p.title, u.name, p.avg_bid, b.bid_price,p.status ";
    getProjectList = getProjectList + " from freelancer_prototype_db.bid b, freelancer_prototype_db.project p, freelancer_prototype_db.user u ";
    getProjectList = getProjectList + " where b.project_id = p.project_id and p.status = '"+"Open"+"' and u.user_id = b.user_id and b.user_id = "+user_id;
    mysql.fetchData(function(err,results){
        if(results.length > 0) {
            var i = 0;
            while(i<results.length) {
                var project = {
                    project_id : results[i].project_id,
                    user_id : results[i].user_id,
                    ProjectName: results[i].title,
                    EmpName: results[i].name,
                    avg_bid: results[i].avg_bid,
                    bid_price: results[i].bid_price,
                    status: results[i].status
                }
                list.push(project);
                i++;
            }
            data.bList = list;
            res.send(data);
        }
    },getProjectList);*/
});

module.exports = router;
