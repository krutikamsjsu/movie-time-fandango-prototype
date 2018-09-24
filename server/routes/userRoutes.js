let express = require('express');
let router = express.Router();
let mysql = require('./mysql');
// let bcrypt = require('bcrypt');
// let salt = bcrypt.genSaltSync(10);

router.get('/verifyLogin', function(req, res, next) {
  console.log(req.query.email);
    console.log(req.params.password);


  let reqUserEmail = req.query.email;
  let reqPassword = req.query.password;

    let getUser = "select userId, userType, email, password from Users where email='"+reqUserEmail+"'";
    let errors = '';

    mysql.fetchData(function (err, results) {
        if (err) {
            errors = "Unable to find user";
            res.status(401).json(errors);
        } else {
          try{
                if(results.length > 0) {
                    //if (bcrypt.compareSync(reqPassword, results[0].userPassword)) {
                    if (reqPassword == results[0].password) {
                        req.session.userId = results[0].userId;
                        console.log("session Initialized ");
                        console.log("Login successful");
                        res.json({
                            message: "Login successful",
                            status: '201',
                            name: results[0].userName,
                            token: req.session.id
                        })
                    }
                    else {
                        console.log("Invalid Password");
                        res.json({message: "Invalid Password or UserName", status: '401'});
                    }
                } else {
                    console.log("Invalid UserName or Password! Please try again");
                    res.json({message: "Login failed", status: '401'});
                  }
            }catch(error){
                console.log("Exception occured" + error.toString());
        }
      }
    }, getUser);
});

router.post('/updateProfile', function(req, res, next) {

    let reqUserEmail = req.query.email;
    let reqPassword = req.query.password;

    let getUser = "select userId, userType, email, password from Users where email='"+reqUserEmail+"'";
    let errors = '';

    mysql.fetchData(function (err, results) {
        if (err) {
            errors = "Unable to find user";
            res.status(401).json(errors);
        } else {
            try{
                if(results.length > 0) {
                    //if (bcrypt.compareSync(reqPassword, results[0].userPassword)) {
                    if (reqPassword == results[0].password) {
                        req.session.userId = results[0].userId;
                        console.log("session Initialized ");
                        console.log("Login successful");
                        res.json({
                            message: "Login successful",
                            status: '201',
                            name: results[0].userName,
                            token: req.session.id
                        })
                    }
                    else {
                        console.log("Invalid Password");
                        res.json({message: "Invalid Password or UserName", status: '401'});
                    }
                } else {
                    console.log("Invalid UserName or Password! Please try again");
                    res.json({message: "Login failed", status: '401'});
                }
            }catch(error){
                console.log("Exception occured" + error.toString());
            }
        }
    }, getUser);
});

router.post('/logout', function (req,res, next){
    console.log(req.session.id);
    req.session.destroy();
    console.log('Session destroyed');
    res.json({message: "Login failed", status: '401'});
});

router.post('/signUp', function (req, res, next) {
    try{
        var reqUsername = req.body.firstName;
        var hash = req.body.password;
        var reqEmail =  req.body.email;

      //  var hash = bcrypt.hashSync(reqPassword, salt);

        var putUser = "insert into tbllogin (`firstName`,`password`, `email`) values " +
            "('"+reqUsername+"','" +hash+"','" +reqEmail+"')";

        console.log("Query is:"+putUser);

        mysql.fetchData(function(err,results){
            if(err){
                throw err;
            }
            else
            {
                if(results.affectedRows > 0){
                    console.log("valid Signup");
                    res.status(201).json({message: "Signup successful", status: '201'});
                }
                else {
                    console.log("Invalid Sign up");
                    res.status(401).json({message: "Could Not Signup", status: '401'});
                }
            }
        },putUser);
    }catch (error){
        console.log("Exception occured" + error.toString());
    }


});

module.exports = router;
